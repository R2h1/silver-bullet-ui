<template>
    <ul ref="theme-list" :class="`${prefixClass}`">
        <li
            :class="{ 
                [`${prefixClass}__item`]: true,
                active: activeList[index], 
            }"
            @click="handleClick(item, index)"
            v-for="(item, index) in data"
            :key="item[valueField]"
        >
            <slot :current="item" :index="index">
                {{ item.label }}
            </slot>
        </li>
    </ul>
</template>
<script>

const DEFAULT_COLOR_INFO = { 
    color: 'rgba(0, 0, 0, 0.9)', 
    bgColor: 'rgb(255, 255, 255)', 
    hoverColor: 'rgba(0, 0, 0, 0.9)', 
    hoverBgColor: '#F3F3F3', 
    activeColor: '#1974FF', 
    activeBgColor: '#E8F5FF', 
}

export default {
    name: 'yt-theme-list',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        valueField: {
            type: String,
            default: 'value',
        },
        data: {
            type: Array,
            default: () => ([])
        },
        value: {
            type: Object,
            default: () => ({}),
        },
        colorInfo: {
            type: Object,
            default: () => ({}) 
        }
    },
    data() { 
        return { 
            prefixClass: 'yt-theme-list'
        } 
    },
    computed: { 
        activeList() { 
            const res = this.data.map((item) => { 
                return item[this.valueField] === this.value[this.valueField] ? true : false; 
            }); 
            return res;
        } 
    },
    mounted() { 
        this.setTheme(); 
    },
    methods: {
        handleClick(value) { 
            this.$emit('change', value) 
        },
        kebabCase(str) { 
            return str.replace(/\B([A-Z])/g, '-$1').toLowerCase(); 
        },
        setTheme() {
            Object.entries(DEFAULT_COLOR_INFO).forEach(([key, value]) => { 
                this.$refs['theme-list'].style.setProperty( `--${this.kebabCase(key)}`, 
                this.hasOwn(this.colorInfo, key) 
                    ? this.colorInfo[key] 
                    : value ); 
            }); 
        }, 
        hasOwn(obj, key) { 
            if (Object.hasOwn) { 
                return Object.hasOwn(obj, key); 
            } 
            return obj.hasOwnProperty(key); 
        } 
    } 
};
</script>
