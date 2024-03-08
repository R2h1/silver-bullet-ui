import Vue from 'vue';
import MessageList from './messageList.vue';

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

const MessageListConstructor = Vue.extend(MessageList);

let seed = 0;
// 存储不同 position 消息列表实例
const instanceMap = new Map();

const MessageFunction = (option) => {
  seed += 1;
  const hackOptions = {
    position: 'top',
    zIndex: 7000,
    attach: 'body',
    id: seed,
    ...option,
  }
  const { position, zIndex, attach } = hackOptions;
  const attachEl = getAttach(attach);
  if (!instanceMap.get(attachEl)) {
    instanceMap.set(attachEl, {});
  }
  let instance = instanceMap.get(attachEl)[position];
  if (!instance || !attachEl.contains(instance.$el)) {
    const list = new MessageListConstructor({
      propsData: {
        position,
        zIndex
      },
    });
    list.add(hackOptions);
    list.$mount();
    instanceMap.get(attachEl)[position] = list;
    attachEl.appendChild(list.$el);
    instance = instanceMap.get(attachEl)[position];
  } else {
    instance.add(hackOptions);
  }

  return new Promise((resolve) => {
    instance.$nextTick(() => {
      const list = instance.$children;
      resolve(list[list.length - 1]);
    });
  });
}

const Message = (type, options, duration) => {
  if (typeof options === 'string') {
    return MessageFunction({ type, message: options, duration });
  } 
  const hackOptions = { ...options, type };
  (duration || duration === 0) && (hackOptions.duration = duration);
  return MessageFunction(hackOptions);
}

const extraApi = {
  info: (options, duration) => Message('info', options, duration),
  success: (options, duration) => Message('success', options, duration),
  warning: (options, duration) => Message('warning', options, duration),
  error: (options, duration) => Message('error', options, duration),
  close: (promise) => {
    promise.then((instance) => instance.close());
  },
  closeAll: () => {
    if (instanceMap instanceof Map) {
      instanceMap.forEach((attach) => {
        Object.keys(attach).forEach((position) => {
          attach[position].removeAll();
        });
      });
    }
  },
};

// 可以通过 Message('info', '消息') 或者 Message.info('消息')调用
Object.keys(extraApi).forEach((funcName) => {
  Message[funcName] = extraApi[funcName];
});

Message.install = () => {
  // 这样定义后，可以通过 this.$message 调用插件
  Vue.prototype.$message = Message;
};

export default Message;