export const timer = (
  fn: () => void,
  time: number = 1000
): { cancel: () => void } => {
  let nextAt: number, timeout: ReturnType<typeof setTimeout>;

  nextAt = new Date().getTime() + time;

  const wrapper = () => {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    fn();
  };

  const cancel = () => clearTimeout(timeout);

  timeout = setTimeout(wrapper, nextAt - new Date().getTime());

  return { cancel };
};
