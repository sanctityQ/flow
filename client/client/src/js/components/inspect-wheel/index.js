
export default (e) => {
  let ele = e.currentTarget;
  let scrollTop = ele.scrollTop;
  let scrollHeight = ele.scrollHeight;
  let height = ele.clientHeight;
  let deltaY = e.deltaY;

  if (deltaY > 0 && scrollHeight - height - scrollTop <= deltaY) {
    let scrollTop = scrollHeight - height;
    ele.scrollTop = scrollTop;
    e.preventDefault();
  }

  if (deltaY < 0 && scrollTop < -1 * deltaY) {
    ele.scrollTop = 0;
    e.preventDefault();
  }
}