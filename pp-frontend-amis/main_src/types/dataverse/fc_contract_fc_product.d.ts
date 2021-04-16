export class fc_contract {
	createdonbehalfbyyominame: string;
	owninguser: string;
	fc_expirationdate: Date;
	fc_htzt: fc_htztEnum;
	statecode: statecodeEnum;
	owneridname: string;
	fc_suppliername: string;
	statecodename: string;
	createdonbehalfby: string;
	fc_parent: string;
	fc_contractid: string;
	importsequencenumber: number;
	fc_parentname: string;
	fc_dealername: string;
	utcconversiontimezonecode: number;
	createdbyyominame: string;
	owningbusinessunit: string;
	modifiedbyname: string;
	owningteam: string;
	modifiedby: string;
	modifiedbyyominame: string;
	createdby: string;
	timezoneruleversionnumber: number;
	fc_comment: string;
	owneridtype: string;
	statuscodename: string;
	fc_dealer_contract: string;
	fc_dealer_contractname: string;
	fc_he_tong_ying_yin_jian_name: string;
	owneridyominame: string;
	fc_name: string;
	modifiedon: Date;
	fc_htztname: Date;
	fc_dealer: string;
	modifiedonbehalfbyyominame: string;
	statuscode: statuscodeEnum;
	createdbyname: string;
	createdon: Date;
	createdonbehalfbyname: string;
	modifiedonbehalfbyname: string;
	fc_effectivedate: Date;
	fc_supplier: string;
	versionnumber: number;
	modifiedonbehalfby: string;
	ownerid: string;
	overriddencreatedon: Date;
}
export enum fc_htztEnum {
	待提交 = 948150000,
	待签署 = 948150001,
	已签署 = 948150002
}
export enum statecodeEnum {
}
export enum statuscodeEnum {
}
export class fc_contract_fc_terminal {
	versionnumber: number;
	fc_terminalid: string;
	fc_contractid: string;
	fc_contract_fc_terminalid: string;
}
export class fc_contract_product_with_price {
	createdonbehalfbyyominame: string;
	owninguser: string;
	transactioncurrencyidname: string;
	statecode: statecodeEnum;
	owneridname: string;
	statecodename: string;
	createdonbehalfby: string;
	transactioncurrencyid: string;
	fc_keyongshiwufanliname: string;
	fc_keyongshiwufanli: boolean;
	importsequencenumber: number;
	modifiedbyyominame: string;
	fc_xieyijiage_base: number;
	versionnumber: number;
	fc_zxjgscjg: boolean;
	fc_zxjgscjgname: boolean;
	utcconversiontimezonecode: number;
	createdbyyominame: string;
	fc_contractname: string;
	owningbusinessunit: string;
	modifiedbyname: string;
	owningteam: string;
	modifiedby: string;
	createdby: string;
	timezoneruleversionnumber: number;
	owneridtype: string;
	statuscodename: string;
	owneridyominame: string;
	fc_name: string;
	modifiedon: Date;
	fc_xieyijiage: number;
	exchangerate: number;
	modifiedonbehalfbyyominame: string;
	statuscode: statuscodeEnum;
	createdbyname: string;
	createdon: Date;
	createdonbehalfbyname: string;
	fc_productname: string;
	fc_contract: string;
	modifiedonbehalfbyname: string;
	fc_contract_product_with_priceid: string;
	modifiedonbehalfby: string;
	fc_product: string;
	ownerid: string;
	overriddencreatedon: Date;
}
export enum statecodeEnum {
}
export enum statuscodeEnum {
}
export class fc_contract_fc_product {
	versionnumber: number;
	fc_contract_fc_productid: string;
	fc_productid: string;
	fc_contractid: string;
}
