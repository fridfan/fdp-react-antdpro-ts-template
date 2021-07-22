declare namespace FRID {
    type Response = Response & { [key: string]: any };
    type Generator = { [key: string]: any }
    type CurrentUser = {
        channelList?: Array<any>,
        email?: string;
        avatar?: string;
        menuList?: Array<any>,
        mobile?: string;
        roleIdList?: Array<any>,
        userId?: string;
        username?: string;
        bindFiled?: any
    };
    type CodeUrl = {
        key: string,
        code: string | null | undefined
    }
    type Custom = {
        name: string,
        logo: string | null | undefined,
        [key: string]: any
    }
}
