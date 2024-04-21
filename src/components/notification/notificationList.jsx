import Vue from 'vue';
import YtNotification from './notification.vue';
import { DEFAULT_OFFSET, POSITION_OPTIONS, DEFAULT_Z_INDEX } from './constant';

export default Vue.extend({
  name: 'YtNotificationList',
  components: { 
    YtNotification
  },
  props: {
    position: {
      type: String,
      default: 'top-right',
      validator(val) {
        return POSITION_OPTIONS.includes(val);
      },
    },
  },
  data() {
    return {
      prefixClass: 'sb-notification-list',
      list: []
    }
  },
  computed: {
    styles() {
      return {
        zIndex: DEFAULT_Z_INDEX,
        ...DEFAULT_OFFSET[this.position],
      };
    },
  },
  methods: {
    add(options) {
      this.list.push(options);
      return this.list.length - 1;
    },
    remove(index) {
      this.list.splice(index, 1);
    },
    removeAll() {
      this.list = [];
    },
    getListeners(index, item) {
      return {
        'close-btn-click': ({ event }) => {
          this.remove(index);
          if (item.onCloseBtnClick) {
            item.onCloseBtnClick({ event });
          }
        },
        'duration-end': () => {
          this.remove(index)
          if (item.onDurationEnd) {
            item.onDurationEnd();
          }
        },
      };
    },
  },
  render() {
    if (!this.list.length) return;
    return (
      <div class={`${this.prefixClass}__${this.position}`} style={this.styles}>
        {this.list.map((item, index) => (
          <sb-notification
            key={item.id}
            style={item.styles}
            {...{ props: item }}
            {...{ on: this.getListeners(index, item) }}
          > 
            {
              Object.keys(item.slots).map(name => (
                <template slot={name}>
                  {item.slots[name]}
                </template>
              ))
            }
          </sb-notification>
        ))}
      </div>
    );
  }
});
