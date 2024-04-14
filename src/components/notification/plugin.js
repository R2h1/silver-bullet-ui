import Vue from 'vue';
import NotificationList from './notificationList.jsx';

const getAttach = (node, triggerNode) => {
  const attachNode = typeof node === 'function' ? node(triggerNode) : node;
  if (!attachNode) {
    return document.body;
  }
  if (typeof attachNode === "string") {
    return document.querySelector(attachNode);
  }
  if (attachNode instanceof HTMLElement) {
    return attachNode;
  }
  return document.body;
};

const getOffset = (val) => {
  if (!val) return;
  return isNaN(Number(val)) ? val : `${val}px`;
}

let seed = 0;
// 存储不同 attach 和 不同 position 消息列表实例
const instanceMap = new Map();

const NotificationFunction = (options) => {
  seed += 1;
  const hackOptions = {
    position: 'top-right',
    zIndex: 7000,
    attach: 'body',
    id: seed,
    ...options,
  };

  hackOptions.content = options.content ? options.content : '';
  hackOptions.styles = {
    marginBottom: '16px',
  }
  if (options.width) {
    hackOptions.styles.width = getOffset(options.width);
  }
  if (options.padding) {
    hackOptions.styles.padding = getOffset(options.padding);
  }
  if (options.offset) {
    hackOptions.styles.position = 'relative';
    hackOptions.styles.left = getOffset(options.offset[0]);
    hackOptions.styles.top = getOffset(options.offset[1]);  
  }
  if (options.zIndex)  hackOptions.styles['z-index'] = options.zIndex;

  const attachEl = getAttach(hackOptions.attach);
  if (!instanceMap.get(attachEl)) {
    instanceMap.set(attachEl, {});
  }
  let instance = instanceMap.get(attachEl)[hackOptions.position];
  if (!instance) {
    const list = new NotificationList({
      propsData: {
        position: hackOptions.position,
      },
    });
    list.add(hackOptions);
    list.$mount();
    instanceMap.get(attachEl)[hackOptions.position] = list;
    attachEl.appendChild(list.$el);
    instance = instanceMap.get(attachEl)[hackOptions.position];
  } else {
    instance.add(hackOptions);
  }

  return new Promise((resolve) => {
    instance.$nextTick(() => {
      const list = instance.$children;
      resolve(list[list.length - 1]);
    });
  });
};

const Notification = (type, options) => {
  const hackOptions = { ...options, type };
  return NotificationFunction(hackOptions);
};


const extraApi = {
  info: (options) => Notification('info', options),
  success: (options) => Notification('success', options),
  warning: (options) => Notification('warning', options),
  error: (options) => Notification('error', options),
  close: (promise) => {
    promise.then((instance) => instance.close());
  },
  closeAll: () => {
    instanceMap.forEach((attach) => {
      Object.keys(attach).forEach((position) => {
        attach[position].removeAll();
      });
    });
  },
};

// 可以通过 Notification('info', '消息') 或者 Notification.info('消息')调用
Object.keys(extraApi).forEach((funcName) => {
  Notification[funcName] = extraApi[funcName];
});

Notification.install = (Vue) => {
  Vue.prototype.$notify = Notification;
};

export default Notification;
