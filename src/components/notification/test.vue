<template>
    <div >
        <div v-if="isShow" :class="`yt-notification-list__${position} is-designer`" :style="designerStyles" >
            <Notification 
                :styles="designerItemStyles" 
                v-bind="$props"
            >
                <slot v-for="(_, key) in $slots" :name="key" :slot="key"></slot>
            </Notification>
        </div>
        <span class="yt-notification-list__designer-show" @dblclick="toggle">显示或隐藏编辑态的消息通知</span>
        <br/>
        <span class="yt-notification-list__designer-show" @click="close">关闭运行态的消息通知</span>
        <br/>
        <span class="yt-notification-list__designer-show" @click="open">打开运行态的消息通知</span>
    </div>
</template>

<script>
import props from './props';
import Notification, { Notify } from ".";
import { DEFAULT_OFFSET, POSITION_OPTIONS, DEFAULT_Z_INDEX } from './constant'

export default {
    name: 'yt-notification',
    components: {
        Notification,
    },

    props: {
        ...props,
        position: {
            type: String,
            default: POSITION_OPTIONS[0],
            validator(val) {
                return POSITION_OPTIONS.includes(val);
            },
        },
        zIndex: {
            type: Number,
            default: DEFAULT_Z_INDEX,
        },
        attach: {
            type: String,
            default: 'body'
        },
        left: {
            type: Number,
            default: 0
        },
        top: {
            type: Number,
            default: 0
        },
        width: {
            type: Number,
            default: 400
        },
        padding: {
            type: Number,
            default: 24, 
        }
    },
    data() {
        return {
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
                styles.width = this.getPx(this.width);
            }
            if (this.left || this.top) {
                styles.position = 'relative';
                styles.left = this.getPx(this.left);
                styles.top = this.getPx(this.top);
                styles.padding = this.getPx(this.padding);
            }
            if (this.zIndex) styles['z-index'] = this.zIndex;
            return styles;
        }
    },
    methods: {
        toggle() {
            this.isShow = !this.isShow;
        },
        open() {
            if (window.notify) return;
                window.notify = Notify(this.type, { 
                ...this.$props,
                offset: [this.left, this.top],
                width: this.width,
                padding: this.padding,
                slots: this.$slots,
                onDurationEnd: () => {
                    this.$emit('close')
                    window.notify = null;
                },
                onCloseBtnClick: ({ event }) => {
                    if (event) {
                    this.$emit('close')
                    window.notify = null;
                    }
                }
                })
            this.$emit('open');
        },
        close() {
            if (!window.notify) return;
            Notify.close(window.notify);
            this.$emit('close');
        },
        getPx(val) {
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
