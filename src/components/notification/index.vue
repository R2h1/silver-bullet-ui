<template>
    <div>
        <yt-notification title="重要提醒" content="您尚未发起立项流程，请尽快准备好相关材料，并发起立项流程" closeable showIcon ></yt-notification>
        <br />
        <button @click="handleClick">3s后消失</button>
        <Test  duration="0" ref="notice" :width="500" title="重要提" content="您尚未发起立项流程，请尽快准备好相关材料，并发起" closeable showIcon :duration="0">
            <template #cont>
                顶顶顶顶顶
            </template>
            <template #foot>
                <span @click="close">取消</span>
            </template>
        </Test>
    </div>
</template>

<script>
import { YtNotification } from ".";
import Test from './test.vue';

export default {
    components: {
        YtNotification,
        Test
    },
    data() {
        return {
            index: 0,
        }
    },
    methods: {
      handleClick() {
        const notification = this.$notify('info', {
          title: `重要提醒${this.index++}`,
          content: '您尚未发起立项流程，请尽快准备好相关材料，并发起立项流程',
          icon: true,
          position: 'bottom-left',
          offset: ['-15px', '-20px']
        })
      },
      close() {
        this.$refs.notice.close();
      }
    }

}
</script>