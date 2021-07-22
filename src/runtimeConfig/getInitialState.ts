import {Settings as LayoutSettings} from "@ant-design/pro-layout";
import settings from "../../config/defaultSettings";
import {logVersion} from "@/utils/utils";


export default async (): Promise<{
  settings?: Partial<LayoutSettings>;
}> => {
  // 全局初始化开始执行[刷新等～]
  logVersion();
  return {
    settings,
  };
}
