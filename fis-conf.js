/**
 * @file fis-conf.js 配置
 */
const path = require('path');
const fs = require('fs');
const package = require('./package.json');
const parserMarkdown = require('./scripts/md-parser');
const convertSCSSIE11 = require('./scripts/scss-ie11');
const parserCodeMarkdown = require('./scripts/code-md-parser');
fis.get('project.ignore').push('public/**', 'npm/**', 'gh-pages/**');
// 配置只编译哪些文件。

const Resource = fis.require('postpackager-loader/lib/resource.js');

Resource.extend({
  buildResourceMap: function () {
    return 'amis.' + this.__super();
  },

  calculate: function () {
    this.__super.apply(this);

    // 标记这个文件，肯定是异步资源，即便是同步加载了。
    Object.keys(this.loaded).forEach(id => {
      const file = this.getFileById(id);

      if (file && file.subpath === '/examples/loadMonacoEditor.ts') {
        this.loaded[id] = true;
      }
    });
  }
});

fis.match('/schema.json', {
  release: '/$0'
});

fis.match('/mock/**', {
  useCompile: false
});

fis.match('mod.js', {
  useCompile: false
});

fis.match('*.scss', {
  parser: fis.plugin('sass', {
    sourceMap: true
  }),
  rExt: '.css'
});

fis.match('/src/icons/**.svg', {
  rExt: '.js',
  isJsXLike: true,
  isJsLike: true,
  isMod: true,
  parser: [
    fis.plugin('svgr', {
      svgProps: {
        className: 'icon'
      },
      prettier: false,
      dimensions: false
    }),
    fis.plugin('typescript', {
      importHelpers: true,
      esModuleInterop: true,
      experimentalDecorators: true,
      sourceMap: false
    })
  ]
});

fis.match('/node_modules/**.js', {
  isMod: true
});

fis.match('tinymce/{tinymce.js,plugins/**.js,themes/silver/theme.js}', {
  ignoreDependencies: true
});

fis.match('tinymce/plugins/*/index.js', {
  ignoreDependencies: false
});

fis.match(/(?:flv\.js)/, {
  ignoreDependencies: true
});

fis.match('monaco-editor/min/**.js', {
  isMod: false,
  ignoreDependencies: true
});

fis.match('/docs/**.md', {
  rExt: 'js',
  parser: [
    parserMarkdown,
    function (contents, file) {
      return contents.replace(
        /\bhref=\\('|")(.+?)\\\1/g,
        function (_, quota, link) {
          if (/\.md($|#)/.test(link) && !/^https?\:/.test(link)) {
            let parts = link.split('#');
            parts[0] = parts[0].replace('.md', '');
            return 'href=\\' + quota + parts.join('#') + '\\' + quota;
          }

          return _;
        }
      );
    }
  ],
  isMod: true
});

fis.on('compile:optimizer', function (file) {
  if (file.isJsLike && file.isMod) {
    var contents = file.getContent();

    if (
      typeof contents === 'string' &&
      contents.substring(0, 7) === 'define('
    ) {
      contents = 'amis.' + contents;

      contents = contents.replace(
        'function(require, exports, module)',
        'function(require, exports, module, define)'
      );

      file.setContent(contents);
    }
  }
});

// 经测试，这段代码是没用的！
// fis.match('*.html:jsx', {
//   parser: fis.plugin('typescript'),
//   rExt: '.js',
//   isMod: false
// });

fis.hook('node_modules', {
  shimProcess: false,
  shimGlobal: false,
  shimBuffer: false
  // shutup: true
});
fis.hook('commonjs', {
  sourceMap: false,
  extList: ['.js', '.jsx', '.tsx', '.ts'],
  paths: {
    'monaco-editor': '/examples/loadMonacoEditor'
  }
});

fis.match('_*.scss', {
  release: false
});

fis.media('dev').match('_*.scss', {
  parser: [
    parserCodeMarkdown,
    function (contents, file) {
      return contents.replace(
        /\bhref=\\('|")(.+?)\\\1/g,
        function (_, quota, link) {
          if (/\.md($|#)/.test(link) && !/^https?\:/.test(link)) {
            let parts = link.split('#');
            parts[0] = parts[0].replace('.md', '');

            if (parts[0][0] !== '/') {
              parts[0] = path
                .resolve(path.dirname(file.subpath), parts[0])
                .replace(/^\/docs/, '');
            }

            return 'href=\\' + quota + parts.join('#') + '\\' + quota;
          }

          return _;
        }
      );
    }
  ],
  release: '$0',
  isMod: true,
  rExt: '.js'
});

fis.media('dev').match('::package', {
  postpackager: fis.plugin('loader', {
    useInlineMap: false,
    resourceType: 'mod'
  })
});

fis.media('dev').match('/node_modules/**.js', {
  packTo: '/pkg/npm.js'
});

fis.match('monaco-editor/**', {
  packTo: null
});

function media_public(){}

//publish-sdk是media名
function media_publish_sdk() {
  console.log('media_publish_sdk');
  const publishSdkEnv = fis.media('publish-sdk');

  fis.on('compile:end', function (file) {
    if (
      file.subpath === '/src/index.tsx' ||
      file.subpath === '/examples/mod.js'
    ) {
      file.setContent(file.getContent().replace('@version', package.version));
    }
  });

  publishSdkEnv.get('project.ignore').push('sdk/**');
  publishSdkEnv.set('project.files', ['examples/sdk-placeholder.html']);

  publishSdkEnv.match('/{examples,scss,src}/(**)', {
    release: '/$1'
  });

  publishSdkEnv.match('*.map', {
    release: false
  });

  publishSdkEnv.match('/node_modules/(**)', {
    release: '/thirds/$1'
  });

  publishSdkEnv.match('/node_modules/(*)/dist/(**)', {
    release: '/thirds/$1/$2'
  });

  publishSdkEnv.match('*.scss', {
    parser: fis.plugin('sass', {
      sourceMap: false
    })
  });

  publishSdkEnv.match('{*.ts,*.jsx,*.tsx,/src/**.js,/src/**.ts}', {
    parser: [
      // docsGennerator,
      fis.plugin('typescript', {
        importHelpers: true,
        esModuleInterop: true,
        experimentalDecorators: true,
        sourceMap: false
      }),
      function (content) {
        return content
          .replace(/\b[a-zA-Z_0-9$]+\.__uri\s*\(/g, '__uri(')
          .replace(
            /return\s+(tslib_\d+)\.__importStar\(require\(('|")(.*?)\2\)\);/g,
            function (_, tslib, quto, value) {
              return `return new Promise(function(resolve){require(['${value}'], function(ret) {resolve(${tslib}.__importStar(ret));})});`;
            }
          );
      }
    ],
    preprocessor: fis.plugin('js-require-css'),
    isMod: true,
    rExt: '.js'
  });

  publishSdkEnv.match('/examples/mod.js', {
    isMod: false,
    // optimizer: fis.plugin('uglify-js')
  });

  publishSdkEnv.match('*.{js,jsx,ts,tsx}', {
    // optimizer: fis.plugin('uglify-js'),
    moduleId: function (m, path) {
      return fis.util.md5('amis-sdk' + path);
    }
  });

  publishSdkEnv.match('/src/icons/**.svg', {
    optimizer: fis.plugin('uglify-js'),
    moduleId: function (m, path) {
      return fis.util.md5('amis-sdk' + path);
    }
  });

  publishSdkEnv.match('::package', {
    packager: fis.plugin('deps-pack', {
      'sdk.js': [
        'examples/mod.js',
        'examples/embed.tsx',
        'examples/embed.tsx:deps',
        'examples/loadMonacoEditor.ts',
        '!flv.js/**',
        '!hls.js/**',
        '!froala-editor/**',
        '!tinymce/**',
        '!jquery/**',
        '!zrender/**',
        '!echarts/**',
        '!papaparse/**',
        '!exceljs/**',
        '!docsearch.js/**',
        '!monaco-editor/**.css',
        '!src/components/RichText.tsx',
        '!src/components/Tinymce.tsx',
        '!src/lib/renderers/Form/CityDB.js'
      ],

      'rich-text.js': [
        'src/components/RichText.tsx',
        'froala-editor/**',
        'jquery/**'
      ],

      'tinymce.js': ['src/components/Tinymce.tsx', 'tinymce/**'],

      'papaparse.js': ['papaparse/**'],

      'exceljs.js': ['exceljs/**'],

      'charts.js': ['zrender/**', 'echarts/**'],

      'rest.js': [
        '*.js',
        '!monaco-editor/**',
        '!flv.js/**',
        '!hls.js/**',
        '!froala-editor/**',
        '!src/components/RichText.tsx',
        '!jquery/**',
        '!zrender/**',
        '!echarts/**',
        '!papaparse/**',
        '!exceljs/**'
      ]
    }),
    postpackager: [
      fis.plugin('loader', {
        useInlineMap: false,
        resourceType: 'mod'
      }),

      require('./scripts/embed-packager')
    ]
  });

  publishSdkEnv.match('{*.min.js,monaco-editor/min/**.js}', {
    optimizer: null
  });

  publishSdkEnv.match('monaco-editor/**.css', {
    standard: false
  });

  fis.on('compile:optimizer', function (file) {
    if (file.isJsLike && file.isMod) {
      var contents = file.getContent();

      // 替换 worker 地址的路径，让 sdk 加载同目录下的文件。
      // 如果 sdk 和 worker 不是部署在一个地方，请通过指定 MonacoEnvironment.getWorkerUrl
      if (
        file.subpath === '/src/components/Editor.tsx' ||
        file.subpath === '/examples/loadMonacoEditor.ts'
      ) {
        contents = contents.replace(
          /function\sfilterUrl\(url\)\s\{\s*return\s*url;/m,
          function () {
            return `var _path = '';
    try {
      throw new Error()
    } catch (e) {
      _path = (/((?:https?|file)\:.*)\\n?$/.test(e.stack) && RegExp.$1).replace(/\\/[^\\/]*$/, '');
    }
    function filterUrl(url) {
      return _path + url.substring(1);`;
          }
        );

        file.setContent(contents);
      }
    }
  });

  publishSdkEnv.match('/examples/loader.ts', {
    isMod: false
  });

  publishSdkEnv.match('*', {
    domain: '.',
    deploy: [
      fis.plugin('skip-packed'),
      function (_, modified, total, callback) {
        var i = modified.length - 1;
        var file;

        while ((file = modified[i--])) {
          if (file.skiped || /\.map$/.test(file.subpath)) {
            modified.splice(i + 1, 1);
          }
        }

        i = total.length - 1;
        while ((file = total[i--])) {
          if (file.skiped || /\.map$/.test(file.subpath)) {
            total.splice(i + 1, 1);
          }
        }

        callback();
      },
      fis.plugin('local-deliver', {
        to: './sdk'
      })
    ]
  });
}

// gh-pages是media名！
function media_gh_pages() {}

if (fis.project.currentMedia() === 'publish') {
  media_public();
} else if (fis.project.currentMedia() === 'publish-sdk') {
  media_publish_sdk();
} else if (fis.project.currentMedia() === 'gh-pages') {
  media_gh_pages();
}
