<template>
    <div class="yt-selector-list">
      <yt-selector />
    <yt-selector 
      :data="data" 
      :loading="loading" 
      prefix="项目经理："
      placeholder="全部"
      optionsLabel="搜索结果"
      showSelectAll
      searchable
      @remote-search="handleRemoteSearch"
      @load-more="handleLoadMore"
      @focus="handleFocus"
      v-model="values"
    >

    </yt-selector>
    <yt-selector 
      :data="data" 
      :loading="loading" 
      placeholder="全部"
      optionsLabel="搜索结果"
      showSelectAll
      remote
      filterable
      searchable
      @remote-search="handleRemoteSearch"
      @load-more="handleLoadMore"
      @focus="handleFocus"
      v-model="values"
    >
    </yt-selector>
    <yt-selector 
      :data="data" 
      :loading="loading" 
      prefix="项目经理："
      placeholder="全部"
      type="txt"
      optionsLabel="搜索结果"
      showSelectAll
      remote
      searchable
      @remote-search="handleRemoteSearch"
      @load-more="handleLoadMore"
      @focus="handleFocus"
      v-model="values"
    >
    </yt-selector>

    <yt-selector 
      :data="data" 
      :loading="loading" 
      prefix="项目经理："
      placeholder="全部"
      type="tag"
      optionsLabel="搜索结果"
      showSelectAll
      remote
      searchable
      @remote-search="handleRemoteSearch"
      @load-more="handleLoadMore"
      @focus="handleFocus"
      v-model="values"
    >
    </yt-selector>

    <div>
      <h6>单选</h6>
      <yt-selector 
        :data="data" 
        :loading="loading" 
        prefix=""
        placeholder="请选择"
        type="tag"
        optionsLabel="搜索结果"
        showSelectAll
        remote
        searchable
        :multiple="false"
        @remote-search="handleRemoteSearch"
        @load-more="handleLoadMore"
        @focus="handleFocus"
        v-model="value"
      >
      </yt-selector>
      </div>

    <div>
      <h6>单选不可搜索</h6>
      <yt-selector 
        :data="data" 
        :loading="loading" 
        prefix=""
        placeholder="请选择"
        type="tag"
        optionsLabel=""

        showSelectAll
        :multiple="false"
        @remote-search="handleRemoteSearch"
        @load-more="handleLoadMore"
        @focus="handleFocus"
        v-model="value"
      >
      </yt-selector>
      </div>
    
    <div>
      <h6>固定popper宽度: 300</h6>
      <yt-selector 
        :data="data" 
        :loading="loading" 
        prefix="项目经理："
        placeholder="全部"
        type="txt"
        optionsLabel="搜索结果"
        showSelectAll
        remote
        autoWidth
        :popperAutoWidth="false"
        :popperWidth="300"
        searchable
        @remote-search="handleRemoteSearch"
        @load-more="handleLoadMore"
        @focus="handleFocus"
        v-model="values"
      >
      </yt-selector>
    </div>
    <div>
      <h6>item 标签样式</h6>
      <yt-selector 
        :data="data" 
        :loading="loading" 
        prefix="项目经理："
        placeholder="全部"
        type="txt"
        optionsLabel="搜索结果"
        showSelectAll
        remote
        autoWidth
        :popperAutoWidth="false"
        :popperWidth="300"
        itemType="txt"
        searchable
        @remote-search="handleRemoteSearch"
        @load-more="handleLoadMore"
        @focus="handleFocus"
        v-model="values"
      >
      </yt-selector>
    </div>
    </div>
</template>

<script>
import { YtSelector } from "@yutu/yt-vue";

export default {
  components: {
    YtSelector,
  },
  data() {
    return {
      data: [],
      loading: false,
      values: [],
      pageInfo: {
        size: 10,
        next: 1,
        done: false,
      },
      value: '',
    }
  },
  watch: {
    values(val) {
      console.log('选中值改变,', val)
    }
  },
  methods: {
    fakeOptions() {
      return new Array(this.pageInfo.size).fill(0).map((_, index) => {
        const id = (this.pageInfo.next - 1) * this.pageInfo.size + index;
        return {
          value: `选项${id}-value`,
          label: `选项${id}-label`,
          prefix: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+5aS05YOPL+aIkOWRmOm7mOiupDwvdGl0bGU+CiAgICA8ZyBpZD0i5aS05YOPL+aIkOWRmOm7mOiupCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGNpcmNsZSBpZD0i5qSt5ZyG5b2iIiBmaWxsPSIjOTVDQUZGIiBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiPjwvY2lyY2xlPgogICAgICAgIDxnIGlkPSIxLkJhc2Xln7rnoYAvMy5JY29u5Zu+5qCHL+eUqOaIty91c2VyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1Ljk5OTk5MywgNS4wMDAwMDApIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS00MTE3IiBvcGFjaXR5PSIwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC4wMDAwMDMsIDEwLjAwMDAwMykgcm90YXRlKDAuMDAwMDIwKSB0cmFuc2xhdGUoLTEwLjAwMDAwMywgLTEwLjAwMDAwMykgIiB4PSIzLjQ5NjkxMDc0ZS0wNiIgeT0iMy40OTY5MTA3NGUtMDYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PC9yZWN0PgogICAgICAgICAgICA8cGF0aCBkPSJNMTAuMDAwMDA3LDEwLjYyNSBDNy41ODM3NjEwNiwxMC42MjUgNS42MjUwMDY3LDguNjY2MjQ1OTQgNS42MjUwMDY3LDYuMjQ5OTk5NyBDNS42MjUwMDY3LDMuODMzNzUzNzYgNy41ODM3NjEwNiwxLjg3NSAxMC4wMDAwMDcsMS44NzUgQzEyLjQxNjI1MjksMS44NzUgMTQuMzc1MDA3LDMuODMzNzUzNzYgMTQuMzc1MDA3LDYuMjQ5OTk5NyBDMTQuMzc1MDA3LDguNjY2MjQ1OTQgMTIuNDE2MjUyOSwxMC42MjUgMTAuMDAwMDA3LDEwLjYyNSBaIE0xMC4wMDAwMDcsOS4zNzUgQzguMjc0MTE2MzYsOS4zNzUgNi44NzUwMDY5OSw3Ljk3NTg4OTQ0IDYuODc1MDA2OTksNi4yNDk5OTk3IEM2Ljg3NTAwNjk5LDQuNTI0MTA5NjYgOC4yNzQxMTYzNiwzLjEyNDk5OTQgMTAuMDAwMDA3LDMuMTI0OTk5NCBDMTEuNzI1ODk2NCwzLjEyNDk5OTQgMTMuMTI1MDA3LDQuNTI0MTA5NjYgMTMuMTI1MDA3LDYuMjQ5OTk5NyBDMTMuMTI1MDA3LDcuOTc1ODkwMDQgMTEuNzI1ODk2NCw5LjM3NSAxMC4wMDAwMDcsOS4zNzUgWiBNMTguMTI1MDA3LDE0LjY1NTc4NTYgTDE4LjEyNTAwNywxNy41IEMxOC4xMjUwMDcsMTcuODQ1MTc3NyAxNy44NDUxODQ2LDE4LjEyNSAxNy41MDAwMDcsMTguMTI1IEwyLjUwMDAwODYzLDE4LjEyNSBDMi4xNTQ4MzA2NSwxOC4xMjUgMS44NzUwMDY5OSwxNy44NDUxNzc3IDEuODc1MDA2OTksMTcuNSBMMS44NzUwMDY5OSwxNC42NTU3ODU2IEMxLjg3NTAwNjk5LDE0LjE5MzMyMDMgMi4xMjg3NzY5LDEzLjc2NTI4MjYgMi41NDYwODcyNywxMy41NjU5NjgzIEM0LjgxMTc2MDg1LDEyLjQ4Mzg0NDggNy4zMzMxNDMxOSwxMS44NzUgMTAuMDAwMDA3NiwxMS44NzUgQzEyLjY2Njg3MTQsMTEuODc1IDE1LjE4ODI1NCwxMi40ODM4NDQ4IDE3LjQ1MzkyNzgsMTMuNTY1OTY4MyBDMTcuODcxMjM3OCwxMy43NjUyODI2IDE4LjEyNTAwNywxNC4xOTMzMjAzIDE4LjEyNTAwNywxNC42NTU3ODU2IFogTTE2Ljg3NTAwNywxNC42NzQ3ODg3IEwxNi44NzUwMDcsMTYuODc1IEwzLjEyNTAwODE5LDE2Ljg3NSBMMy4xMjUwMDgxOSwxNC42NzQ3ODg3IEM1LjIxNzkzODI2LDEzLjY4MjE1OTIgNy41NDE3NjE4NCwxMy4xMjUgMTAuMDAwMDA3NiwxMy4xMjUgQzEyLjQ1ODI1MjcsMTMuMTI1IDE0Ljc4MjA3NjksMTMuNjgyMTU5MiAxNi44NzUwMDcsMTQuNjc0Nzg4NyBaIiBpZD0iVW5pb24iIGZpbGwtb3BhY2l0eT0iMC45IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=',
          color: '#00A870',
          bgColor: '#E8F8F2'
        }
      })
    },
    fetchOptions(keyword = '',delay = 600) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.fakeOptions().filter(option => option.label.includes(keyword)));
        }, delay);
      })
    },
    handleLoadMore(val) {
      console.log('load', this.pageInfo.done, this.pageInfo.next)
      if (this.pageInfo.done) {
        return;
      }
      this.loading = true;
      this.fetchOptions(val).then((res) => {
        this.data.push(...res);
        this.loading = false;
        if (this.pageInfo.next === 5) {
          this.pageInfo.done = true;
        } else {
          this.pageInfo.next = this.pageInfo.next + 1;
        }
      });
    },
    handleFocus() {
      if (!this.data.length && !this.loading) {
        this.loading = true;
        this.fetchOptions().then((res) => {
          this.data = res;
          this.loading = false;
          this.pageInfo.next = this.pageInfo.next + 1;
        });
      }   
    },
    handleRemoteSearch(val) {
      this.pageInfo.next = 1;
      this.pageInfo.done = false;
      this.$nextTick(() => {
        this.loading = true;
        this.fetchOptions(val).then((res) => {
          this.data = res;
          this.loading = false;
        });
      })
    },
  }
}
</script>
<style lang="scss">
.yt-selector-list {
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
}
</style>