import { notification } from "antd";

export function handleError(baseMessage?: string, error?: Error) {
  // eslint-disable-next-line no-console
  console.error(error);
  notification.error({
    message: `${baseMessage}: ${error}`
  });
}