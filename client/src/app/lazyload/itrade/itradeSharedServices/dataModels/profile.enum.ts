export interface ICustomerDetails {
    exg_trade_date: {
        NSE: string,
        BSE: string,
        FNO: string,
        NDX: string
    },
    exg_status: {
        NSE: string,
        BSE: string,
        FNO: string,
        NDX: string
    },
    segments_allowed: {
        Trading: string,
        Equity: string,
        Derivatives: string,
        Currency: string
    },
    idirect_userid: string,
    idirect_user_name: string,
    idirect_ORD_TYP: string,
    idirect_lastlogin_time: string,
    mf_holding_mode_popup_flg: string,
    commodity_exchange_status: string,
    commodity_trade_date: string,
    commodity_allowed: string
}