<template>
    <div>
        <div v-if="isShow" :class="`yt-notification-list__${position} is-designer`" :style="designerStyles" >
            <yt-notification 
                :styles="designerItemStyles" 
                v-bind="$props"
            >
                <slot v-for="(_, key) in $slots" :name="key" :slot="key"></slot>
            </yt-notification>
        </div>
        <span class="yt-notification-list__designer-show" @click="toggle">显示或隐藏编辑状态的消息通知</span>
        <br/>
        <span class="yt-notification-list__designer-show" @click="close">关闭运行态的消息通知</span>
        <br/>
        <span class="yt-notification-list__designer-show" @click="open">打开运行态的消息通知</span>
    </div>
</template>

<script>
import props from '../../../components/notification/props';
import YtNotification, { Notify  }  from "../../../components/notification";
import NotificationList from '../../../components/notification/notificationList.jsx';

const DEFAULT_OFFSET = {
    'top-left': {
        left: '16px',
        top: '16px',
    },
    'top-right': {
        right: '16px',
        top: '16px',
    },
    'bottom-right': {
        right: '16px',
        bottom: '16px',
    },
    'bottom-left': {
        left: '16px',
        bottom:'16px',
    },
};

export default {
    components: {
        YtNotification,
        NotificationList,
    },

    props: {
        ...props,
        position: {
            type: String,
            default: 'top-right',
            validator(val) {
                return ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(val);
            },
        },
        zIndex: {
            type: Number,
            default: 7000,
        },
        attach: {
            type: String,
            default: 'body'
        },
        offsetLeft: {
            type: Number,
            default: 0
        },
        offsetLeft: {
            type:Number,
            default: 0
        },
        width: {
            type: Number,
            default: 400
        }
    },
    data() {
        return {
            item: null,
            isShow: false,
        }
    },
    computed: {
        designerStyles() {
            return {
                zIndex: this.zIndex,
                ...DEFAULT_OFFSET[this.position],
            };
        },
        designerItemStyles() {
            const styles = {
                marginBottom: '16px',
            }
            if (this.width) {
              styles.width = this. getOffset(this.width);
            }
            if (this.offset) {
                styles.position = 'relative';
                styles.left = this.getOffset(this.offset[0]);
                styles.top = this.getOffset(this.offset[1]);  
            }
            if (this.zIndex)  styles['z-index'] = this.zIndex;
            return styles;
        }
    },
    methods: {
        toggle() {
            this.isShow = !this.isShow;
        },
        open() {
          if (this.notify) return;
            this.notify = Notify(this.type, { 
              ...this.$props,
              width: this.getOffset(500),
              slots: this.$slots,
              onDurationEnd: () => {
                this.$emit('close')
                this.notify = null;
              },
              onCloseBtnClick: ({ event }) => {
                if (event) {
                this.$emit('close')
                this.notify = null;
                }
              }
            })
          this.$emit('open');
        },
        close() {
          if (!this.notify) return;
          Notify.close(this.notify);
          this.notify = null
          this.$emit('close');
        },
        getOffset(val) {
          if (!val) return;
          return isNaN(Number(val)) ? val : `${val}px`;
        }
    }
}
</script>

<style>
.yt-notification-list__designer-hide {
    align-self: flex-end;
    padding: 3px 5px;
    background-color: rgba(51, 132, 246);
    cursor: pointer;
    color: #fff;
}
.is-designer {
    display: flex;
    flex-direction: column;
}
.yt-notification-list__designer-show {
    background-color: rgba(35, 37, 39, 0.5);
    cursor: pointer;
    color: #fff;
    padding: 5px 8px;
    margin-top: 10px;
    display: inline-block;
}
</style>