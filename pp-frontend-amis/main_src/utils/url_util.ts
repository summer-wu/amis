export function get_url_param_with_key(url: string, key: string): string | null {
  const url0: URL = new URL(url);
  return url0.searchParams.get(key);
}

// hash一般就是location.hash
// 示例传入 ('#id=a&name=b','name') 返回 'b'
export function get_hash_param_with_key(hash: string, key: string): string | null {
  if (hash.startsWith('#')){
    hash = hash.substr(1,hash.length-1);
    return get_hash_param_with_key(hash,key);
  }
  const params = new URLSearchParams(hash);
  return params.get(key);
}
