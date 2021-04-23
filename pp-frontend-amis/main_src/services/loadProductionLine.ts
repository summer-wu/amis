// http://101.132.71.118:8083/api/ContractAdd/loadProductionLine
import * as fs from 'fs';
import {root} from 'postcss';

const payload = {
  success: true,
  list: [
    {id: 'forceclousd001_002-c', name: '药品', pId: '-c', state: '1', isCategory: '1'},
    {id: 'forceclousd001_002_001-c', name: '普药', pId: 'forceclousd001_002-c', state: '1', isCategory: '1'},
    {id: 'forceclousd001_002_002-c', name: '新药', pId: 'forceclousd001_002-c', state: '1', isCategory: '1'},
    {id: 'forceclousd001_002_003-c', name: '二线', pId: 'forceclousd001_002-c', state: '1', isCategory: '1'},
    {id: 'forceclousd001_002_004-c', name: '外贸', pId: 'forceclousd001_002-c', state: '1', isCategory: '1'},
    {id: 'forceclousd001_003-c', name: '食品', pId: '-c', state: '1', isCategory: '1'},
    {id: 'forceclousd001_003_001-c', name: '龟苓膏', pId: 'forceclousd001_003-c', state: '1', isCategory: '1'},
    {id: 'forceclousd001_003_002-c', name: '糖', pId: 'forceclousd001_003-c', state: '1', isCategory: '1'},
    {id: 'forceclousd001_003_003-c', name: '食品糖', pId: 'forceclousd001_003-c', state: '1', isCategory: '1'},
    {id: 'forceclousd001_003_004-c', name: '饮料', pId: 'forceclousd001_003-c', state: '1', isCategory: '1'},
    {id: 'forceclousd001_003_005-c', name: '保健食品', pId: 'forceclousd001_003-c', state: '1', isCategory: '1'},
    {id: 'forceclousd001_004-c', name: '口罩', pId: '-c', state: '1', isCategory: '1'},
    {id: '7070710-p', name: '潘高寿川贝枇杷糖33G', pId: 'forceclousd001_003_002-c', state: '1', isCategory: '0'},
    {id: '7070711-p', name: '潘高寿川贝枇杷糖26.4G', pId: 'forceclousd001_003_002-c', state: '1', isCategory: '0'},
    {id: '7070712-p', name: '潘高寿润喉糖-B(特强型)', pId: 'forceclousd001_003_002-c', state: '1', isCategory: '0'},
    {id: '7070713-p', name: '潘高寿润喉糖-A(原味型)', pId: 'forceclousd001_003_002-c', state: '1', isCategory: '0'},
    {id: '7070790-p', name: 'G6800深灰色L码时尚舒适口罩', pId: 'forceclousd001_004-c', state: '1', isCategory: '0'},
    {id: '7070791-p', name: 'G6800深蓝色L码时尚舒适口罩', pId: 'forceclousd001_004-c', state: '1', isCategory: '0'},
    {id: '7070792-p', name: 'G6800枣红色M码时尚舒适口罩', pId: 'forceclousd001_004-c', state: '1', isCategory: '0'},
    {id: '7070793-p', name: 'G6800玫红色M码时尚舒适口罩', pId: 'forceclousd001_004-c', state: '1', isCategory: '0'},
    {id: '7070794-p', name: 'G8021V灰色折叠式活性炭口罩', pId: 'forceclousd001_004-c', state: '1', isCategory: '0'},
    {id: '7070795-p', name: 'G3600白色棉纱口罩', pId: 'forceclousd001_004-c', state: '1', isCategory: '0'},
    {id: '7070798-p', name: '潘高寿胖大海雪梨糖', pId: 'forceclousd001_003_003-c', state: '1', isCategory: '0'},
    {id: '7070800-p', name: '鲜橙Vc泡腾片', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070801-p', name: '蓝莓Vc泡腾片', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070802-p', name: '咖啡左旋肉碱Vc泡腾片', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070803-p', name: '果味C+E泡腾片', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070804-p', name: '柠檬Vc泡腾片', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070805-p', name: '绿茶左旋肉碱Vc泡腾片', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070806-p', name: '水蜜桃Vc泡腾片', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070807-p', name: '草莓Vc泡腾片', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070808-p', name: '强化膳食纤维蛋白质粉', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070809-p', name: '强化叶酸蛋白质粉', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070810-p', name: '乳清蛋白蛋白质粉480G/罐×18罐', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070811-p', name: '乳清蛋白蛋白质粉480G/罐×18罐', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070812-p', name: '胶原蛋白质粉', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070813-p', name: '强化大豆磷脂蛋白质粉', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070814-p', name: '潘高寿川贝枇杷糖44G', pId: 'forceclousd001_003_002-c', state: '1', isCategory: '0'},
    {id: '7070815-p', name: '潘高寿川贝枇杷糖(防霾）散装糖', pId: 'forceclousd001_003_002-c', state: '1', isCategory: '0'},
    {id: '7070818-p', name: '瓶装玛咖压片糖果', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070819-p', name: '礼盒装玛咖压片糖果', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070840-p', name: '蛇胆川贝枇杷膏', pId: 'forceclousd001_002_003-c', state: '1', isCategory: '0'},
    {id: '7070843-p', name: '蜜炼川贝枇杷膏', pId: 'forceclousd001_002_003-c', state: '1', isCategory: '0'},
    {id: '7070878-p', name: '潘高寿川贝枇杷糖39.6G×120', pId: 'forceclousd001_003_002-c', state: '1', isCategory: '0'},
    {id: '7070881-p', name: '金银花柠檬糖56G', pId: 'forceclousd001_003_003-c', state: '1', isCategory: '0'},
    {id: '7070882-p', name: '金银花柠檬糖33G', pId: 'forceclousd001_003_003-c', state: '1', isCategory: '0'},
    {id: '7070929-p', name: '采森牌钙铁锌口服液10ML/瓶×10瓶/盒', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070930-p', name: '采森牌钙加锌口服液10ML/瓶×10瓶/盒', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070931-p', name: '采森牌葡萄糖酸钙口服液', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070932-p', name: '采森牌钙铁锌氨基酸口服液', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070933-p', name: '采森牌葡萄糖酸锌口服液', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070940-p', name: '潘高寿柠檬糖', pId: 'forceclousd001_003_003-c', state: '1', isCategory: '0'},
    {id: '7070941-p', name: '潘高寿薄荷糖', pId: 'forceclousd001_003_003-c', state: '1', isCategory: '0'},
    {id: '7070942-p', name: '潘高寿菊花糖', pId: 'forceclousd001_003_003-c', state: '1', isCategory: '0'},
    {id: '7070943-p', name: '潘高寿甘草糖', pId: 'forceclousd001_003_003-c', state: '1', isCategory: '0'},
    {id: '7070944-p', name: '潘高寿茉莉花糖', pId: 'forceclousd001_003_003-c', state: '1', isCategory: '0'},
    {id: '7070945-p', name: '潘高寿胖大海糖', pId: 'forceclousd001_003_003-c', state: '1', isCategory: '0'},
    {id: '7070952-p', name: '蛇胆川贝液', pId: 'forceclousd001_002_003-c', state: '1', isCategory: '0'},
    {id: '7070961-p', name: 'G-6200玫红色时尚舒适口罩', pId: 'forceclousd001_004-c', state: '1', isCategory: '0'},
    {id: '7070962-p', name: 'G-6200藏青色时尚舒适口罩', pId: 'forceclousd001_004-c', state: '1', isCategory: '0'},
    {id: '7070963-p', name: '霾之宝植物饮料', pId: 'forceclousd001_003_004-c', state: '1', isCategory: '0'},
    {id: '7070980-p', name: '潘高寿苹果醋（红罐）', pId: 'forceclousd001_003_004-c', state: '1', isCategory: '0'},
    {id: '7070999-p', name: '龟苓膏（原味袋装果冻型）', pId: 'forceclousd001_003_001-c', state: '1', isCategory: '0'},
    {id: '7071000-p', name: '龟苓膏（红豆袋装果冻型）', pId: 'forceclousd001_003_001-c', state: '1', isCategory: '0'},
    {id: '7071001-p', name: '龟苓膏（燕麦袋装果冻型）', pId: 'forceclousd001_003_001-c', state: '1', isCategory: '0'},
    {id: '7071002-p', name: '龟苓膏（罐装）', pId: 'forceclousd001_003_001-c', state: '1', isCategory: '0'},
    {id: '7071003-p', name: '龟苓膏（杯装）', pId: 'forceclousd001_003_001-c', state: '1', isCategory: '0'},
    {id: '7071026-p', name: '胖大海枇杷叶糖', pId: 'forceclousd001_003_003-c', state: '1', isCategory: '0'},
    {id: '7071027-p', name: '菊花枇杷叶糖', pId: 'forceclousd001_003_003-c', state: '1', isCategory: '0'},
    {id: '7071107-p', name: '原味迷你型龟苓膏500G×20袋/箱', pId: 'forceclousd001_003_001-c', state: '1', isCategory: '0'},
    {id: '7071108-p', name: '燕麦味迷你型龟苓膏500G×20袋/箱', pId: 'forceclousd001_003_001-c', state: '1', isCategory: '0'},
    {id: '7071109-p', name: '红豆味迷你型龟苓膏500G×20袋/箱', pId: 'forceclousd001_003_001-c', state: '1', isCategory: '0'},
    {id: '7071152-p', name: '潘高寿木糖醇苹果醋', pId: 'forceclousd001_003_004-c', state: '1', isCategory: '0'},
    {id: '7071153-p', name: '潘高寿苹果醋', pId: 'forceclousd001_003_004-c', state: '1', isCategory: '0'},
    {id: '7071177-p', name: '原味迷你型龟苓膏375G×26袋/箱', pId: 'forceclousd001_003_001-c', state: '1', isCategory: '0'},
    {id: '7071178-p', name: '燕麦味迷你型龟苓膏375G×26袋/箱', pId: 'forceclousd001_003_001-c', state: '1', isCategory: '0'},
    {id: '7071179-p', name: '红豆味迷你型龟苓膏375G×26袋/箱', pId: 'forceclousd001_003_001-c', state: '1', isCategory: '0'},
    {id: '7071183-p', name: '医用冷敷贴（煜和堂）', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071182-p', name: '红葡萄蔓越莓营养棒', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071184-p', name: '九果轻畅饮', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070880-p', name: '蛋白粉', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071194-p', name: '人参膏（浓缩饮液）', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071195-p', name: '雪梨膏（浓缩饮液）', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071196-p', name: '黄精蛹虫草膏（浓缩饮液）', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071197-p', name: '阿胶膏（浓缩饮液）', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071198-p', name: '砂仁膏（浓缩饮液）', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071199-p', name: '海参牡蛎膏（浓缩饮液）', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071200-p', name: '百合枇杷叶膏（浓缩饮液）', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071201-p', name: '玫瑰阿胶膏（浓缩饮液）150G/瓶*3瓶/盒', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071202-p', name: '软骨素氨糖骨碎补胶原蛋白维生素C胶囊0.45g/粒*90粒/盒', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071203-p', name: '软骨素氨糖骨碎补胶原蛋白维生素C胶囊90粒/瓶*2瓶/盒', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071192-p', name: '玫瑰阿胶膏（浓缩饮液）15G/条*21条/盒', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071191-p', name: '本草植萃植物饮液', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071142-p', name: '海瑞康牌黄芪太子参口服液', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071143-p', name: '精力牌参加茸口服液', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071144-p', name: '威门牌铁皮石斛西洋参牛磺酸口服液', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071145-p', name: '海瑞康牌黄芪当归阿胶口服液', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071146-p', name: '黄芪茯苓枸杞子氨基酸口服液', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071147-p', name: '太子参陈皮山药山楂麦芽茯苓口服液', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071148-p', name: '罗汉果枇杷膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071149-p', name: '佛手膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071150-p', name: '真菌膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071151-p', name: '鹿筋鹿鞭膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071154-p', name: '美媛春清清口服液', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071155-p', name: '平卧菊三七膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071156-p', name: '三宝膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071157-p', name: '罗汉果膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071158-p', name: '海参牡蛎膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071159-p', name: '鹿筋鹿鞭膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071160-p', name: '真菌膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071161-p', name: '鹿心鹿血膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071162-p', name: '黄精阿胶大鲵膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071163-p', name: '龟蛇膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071164-p', name: '红糖姜枣膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071165-p', name: '佛手膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071166-p', name: '秋梨雪莲膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071167-p', name: '娉婷膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071168-p', name: '北虫草膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071169-p', name: '玫瑰膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071170-p', name: '燕麦红球藻膏', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071173-p', name: '复合植物多肽人参能量棒', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071174-p', name: '活力水果素', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071175-p', name: '鹿鞭鹿肾片', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071176-p', name: '鹿心血肽粉', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071180-p', name: '膳食纤维小蛋卷', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071181-p', name: '茶树精油洗面奶', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071193-p', name: '玫瑰阿胶膏（浓缩饮液）', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071205-p', name: '鹿鞭鹿肾片', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071207-p', name: '茶树精油洗面奶', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071223-p', name: '黑人参即食复合杂粮粉', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071220-p', name: '活力水果素（同康生物）', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071221-p', name: '卵白蛋白益生菌膳食纤维粉', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071222-p', name: '遇梦饮（植物饮料）', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071224-p', name: '红参饮品', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071219-p', name: '膳食纤维小蛋卷', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071228-p', name: '医用冷敷贴（康友）', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071227-p', name: '黑参鹿鞭片', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071230-p', name: '丹参茶', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070046-p', name: '杏苏止咳口服液', pId: 'forceclousd001_002_003-c', state: '1', isCategory: '0'},
    {id: '7070526-p', name: '治咳川贝枇杷露', pId: 'forceclousd001_002_001-c', state: '1', isCategory: '0'},
    {id: '7070558-p', name: '炎热清胶囊', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7070624-p', name: '升血调元汤', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7070627-p', name: '丹鳖胶囊0.38G×45粒×96/箱', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7070629-p', name: '丹鳖胶囊0.38G×75粒×96/箱', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7070635-p', name: '炎热清胶囊', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7070645-p', name: '桑菊感冒合剂', pId: 'forceclousd001_002_003-c', state: '1', isCategory: '0'},
    {id: '7070648-p', name: '治咳枇杷露', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7070653-p', name: '杏仁止咳合剂', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7070654-p', name: '半夏糖浆', pId: 'forceclousd001_002_003-c', state: '1', isCategory: '0'},
    {id: '7070782-p', name: '维血康糖浆', pId: 'forceclousd001_002_003-c', state: '1', isCategory: '0'},
    {id: '7070785-p', name: '治咳川贝枇杷露', pId: 'forceclousd001_002_003-c', state: '1', isCategory: '0'},
    {id: '7070817-p', name: '杏苏止咳口服液', pId: 'forceclousd001_002_003-c', state: '1', isCategory: '0'},
    {id: '7070822-p', name: '小儿七星茶糖浆', pId: 'forceclousd001_002_003-c', state: '1', isCategory: '0'},
    {id: '7070838-p', name: '小儿止咳糖浆', pId: 'forceclousd001_002_003-c', state: '1', isCategory: '0'},
    {id: '7070839-p', name: '蛇胆川贝枇杷膏', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7070842-p', name: '蜜炼川贝枇杷膏', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7070856-p', name: '升血调元汤', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7070866-p', name: '参术止带糖浆', pId: 'forceclousd001_002_003-c', state: '1', isCategory: '0'},
    {id: '7070867-p', name: '养阴清肺合剂240ML×64瓶/箱', pId: 'forceclousd001_002_003-c', state: '1', isCategory: '0'},
    {id: '7070868-p', name: '养阴清肺合剂150ML×96瓶/箱', pId: 'forceclousd001_002_003-c', state: '1', isCategory: '0'},
    {id: '7070951-p', name: '蛇胆川贝液', pId: 'forceclousd001_002_001-c', state: '1', isCategory: '0'},
    {id: '7070953-p', name: '小儿清热利肺口服液10ML×6× 100', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7070954-p', name: '小儿清热利肺口服液10ML×10× 60', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7070956-p', name: '益肾养元合剂', pId: 'forceclousd001_002_003-c', state: '1', isCategory: '0'},
    {id: '7070958-p', name: '养血当归糖浆', pId: 'forceclousd001_002_003-c', state: '1', isCategory: '0'},
    {id: '7070970-p', name: '藿香正气合剂', pId: 'forceclousd001_002_003-c', state: '1', isCategory: '0'},
    {id: '7070985-p', name: '养阴清肺合剂', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7070986-p', name: '治咳枇杷露', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7071204-p', name: '丹鳖胶囊0.38G×90粒×200/箱', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7070665-p', name: '加拿大装蜜炼川贝枇杷膏', pId: 'forceclousd001_002_004-c', state: '1', isCategory: '0'},
    {id: '7070666-p', name: '加拿大装治咳川贝枇杷露', pId: 'forceclousd001_002_004-c', state: '1', isCategory: '0'},
    {id: '7070768-p', name: '蛇胆川贝液（加拿大装）', pId: 'forceclousd001_002_004-c', state: '1', isCategory: '0'},
    {id: '7070777-p', name: '蛇胆川贝液（出口装）', pId: 'forceclousd001_002_004-c', state: '1', isCategory: '0'},
    {id: '7070778-p', name: '蛇胆川贝枇杷膏（加拿大装）', pId: 'forceclousd001_002_004-c', state: '1', isCategory: '0'},
    {id: '7070821-p', name: '金装三蛇胆川贝液', pId: 'forceclousd001_002_004-c', state: '1', isCategory: '0'},
    {id: '7070034-p', name: '清热化湿口服液', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7071036-p', name: '丹鳖胶囊120粒×96', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7070072-p', name: '三蛇胆川贝液10ML×6×100[仙草]', pId: 'forceclousd001_002_004-c', state: '1', isCategory: '0'},
    {id: '7070074-p', name: '三蛇胆川贝液10ML×6×100', pId: 'forceclousd001_002_004-c', state: '1', isCategory: '0'},
    {id: '7070991-p', name: '蛇胆川贝枇杷膏', pId: 'forceclousd001_002_001-c', state: '1', isCategory: '0'},
    {id: '7070990-p', name: '蜜炼川贝枇杷膏', pId: 'forceclousd001_002_001-c', state: '1', isCategory: '0'},
    {id: '7070987-p', name: '小儿止咳糖浆', pId: 'forceclousd001_002_002-c', state: '1', isCategory: '0'},
    {id: '7071102-p', name: '丹参茶', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070968-p', name: '丹参茶', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071245-p', name: '丹参茶', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071229-p', name: '鹿血参精片', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070879-p', name: '芦荟胶囊', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070967-p', name: '牛初乳蛋白质粉', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070966-p', name: '阿胶蛋白质粉', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070964-p', name: '中老年多维蛋白质粉', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070965-p', name: '营养强化蛋白质粉', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071117-p', name: '康富丽牌鱼油软胶囊 200粒', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071118-p', name: '康富丽牌鱼油软胶囊 100粒', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071119-p', name: '康富丽牌天然维生素E软胶囊', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070836-p', name: '维生素B族片 100片', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071116-p', name: '康富丽牌钙加维生素D3软胶囊（赠品）30粒×300', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071113-p', name: '康富丽牌钙加维生素D3软胶囊 300粒', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071114-p', name: '康富丽牌钙加维生素D3软胶囊 200粒', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7071115-p', name: '康富丽牌钙加维生素D3软胶囊 100粒', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070833-p', name: '铁叶酸片 100片', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070869-p', name: '硫酸软骨素加钙片 30g×6', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070835-p', name: '钙铁锌硒片100片', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070832-p', name: '钙镁加维生素D片 100片', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070834-p', name: '钙加维生素D咀嚼片 100片', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070828-p', name: '大豆磷脂软胶囊 200粒', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070825-p', name: '大豆磷脂软胶囊 100粒', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'},
    {id: '7070996-p', name: '辅酶Q10软胶囊', pId: 'forceclousd001_003_005-c', state: '1', isCategory: '0'}
  ]
};

export interface IProduct {
  id: string;
  name: string;
  pId: string; //parent id,'-c'表示root
  state: '1';
  isCategory: '0' | '1';
  children?: IProduct[];
  value?: string; //normalize之后会有
  label?: string; //normalize之后会有
}

function add_sub_node(parent: IProduct, child: IProduct): void {
  if (parent.children) {
    parent.children.push(child);
  } else {
    parent.children = [child];
  }
}

// 正式化，添加value属性
function normalize_node(node: IProduct) {
  if (!node.value) {
    node.value = node.id;
  }
  if (!node.label) {
    node.label = node.name;
  }
  return node;
}

interface IId2Node {
  [product_id: string]: IProduct;
}
function get_id2node(): IId2Node {
  const id2node: IId2Node = {};
  const rootProduct: IProduct = {id: '-c', name: 'rootProduct', pId: '', state: '1', isCategory: '1'};
  id2node[rootProduct.id] = normalize_node(rootProduct);

  for (let product of payload.list) {
    id2node[product.id] = normalize_node(product as IProduct);
  }

  return id2node;
}

// 获得tree like的rootProduct，已经添加了children
function get_rootProduct_tree_like(): IProduct {
  const id2node = get_id2node();

  for (let id of Object.keys(id2node)) {
    const product = id2node[id];
    if (!!product.pId) {
      const parent = id2node[product.pId];
      const child = product;
      add_sub_node(parent, child);
    }
  }
  const rootProduct = id2node['-c'];
  return rootProduct;
}

// 打印一颗完整的树，仅调试时使用
function printATree(tree: IProduct, depth: number): void {
  console.log(' '.repeat(4 * depth), tree.name);
  if (!tree.children) {
    return;
  }
  if (tree.children.length <= 0) {
    return;
  }
  for (const subnode of tree.children) {
    printATree(subnode, depth + 1);
  }
}

export function get_amis_options(): IProduct[] {
  const rootProduct = get_rootProduct_tree_like();
  const options = [];
  for (const node of rootProduct.children!) {
    options.push(node);
  }
  return options;
}

// tree_field是一个array，其中可能有children。可以统一一下，将tree_field和product.children都看作subnodes，都是array类型
function get_all_products_from_subnodes(subnodes: Array<IProduct>): IProduct[] {
  const products = [];
  for (const product of subnodes) {
    if (product.children){
      const products_from_product_subnodes = get_all_products_from_subnodes(product.children || []);
      delete product.children;
      products.push(...products_from_product_subnodes);
    }
    products.push(product);
  }
  return products;
}
interface IContractItem {
  productCode: string;
  productName: string;
  format: string;
  standardPrice: string;
  negotiatedPrice: string;
  rebateFlag: boolean;
  byBookPrice: boolean;
}

function normalize_contract_item(product:IProduct):IContractItem{
  const item:IContractItem = {
    productCode:product.id,
    productName:product.name,
    format:'产品规格',
    standardPrice:'0.00',
    negotiatedPrice:'',
    rebateFlag:false,
    byBookPrice:false
  };
  return item;
}

// tree_field是step2中，左侧的产品树
export function get_all_contract_items_from_tree_field(tree_field:IProduct[]):IContractItem[]{
  const products = get_all_products_from_subnodes(tree_field);
  const contract_items = products.map(normalize_contract_item);
  return contract_items;
}

if (require.main === module) {
  const rootProduct = get_rootProduct_tree_like();
  console.log(get_all_contract_items_from_tree_field(rootProduct.children as any))

  // console.log(get_amis_options())
  // printATree(rootProduct, 0);
  // fs.writeFileSync('./rootProduct.json', JSON.stringify(rootProduct));
}
