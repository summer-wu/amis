interface IODataError {
  error: {
    code: string | '0x0';
    message: string | 'The query parameter $annotations is not supported';
  };
}

interface IODataRecord {
  [key: string]: null | string | boolean | number;
}

interface IODataEntitysetResult {
  '@odata.context': string;
  '@odata.count'?: number; //必须明确指定 ?$count=true 才能获取到
  '@odata.nextLink':string; //默认一页5000条，用 "Prefer":"odata.maxpagesize=50"，修改一页条数；仅当有下一页时才有这个key，当前是最后一页则没有这个key
  'value': IODataRecord[]; //value是一个数组
}
//@odata.nextLink: "https://dms-dev-v1.crm5.dynamics.com/api/data/v9.2/fc_regions?$skiptoken=%3Ccookie%20pagenumber=%222%22%20pagingcookie=%22%253ccookie%2520page%253d%25221%2522%253e%253cfc_regionid%2520last%253d%2522%257bFF643049-D47F-EB11-A812-000D3AC8B749%257d%2522%2520first%253d%2522%257b876D732C-E87B-EB11-A812-000D3AC89826%257d%2522%2520%252f%253e%253c%252fcookie%253e%22%20istracking=%22False%22%20/%3E"
