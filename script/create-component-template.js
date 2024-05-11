const fs = require("fs");
const path = require("path");

const componentDir = path.join(process.cwd(), 'src', 'components')

const files = fs.readdirSync(componentDir);

const dir = process.argv[2];

if (!dir) {
  throw new Error('请提供组件名');
}

const camelCaseDir = dir.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));

const componentName = camelCaseDir.charAt(0).toUpperCase()
+ camelCaseDir.slice(1);

const prefix = 'sb';

// 创建文件
function createFile(fileName, content) {
    fs.openSync(path.join(componentDir, dir, fileName), 'w');
    fs.writeFileSync(path.join(componentDir, dir, fileName), content);
}

if (files.some(file => file === dir)) {
  throw new Error("已经存在同名组件");
} else {
  fs.mkdirSync(path.join(componentDir, dir));
  const fileContentMap = {
    'index.js': `import ${componentName} from "./${dir}.vue";
${componentName}.install = (Vue) => {
    Vue.component(${componentName}.name, ${componentName});
};

export const Yt${componentName} = ${componentName};

export default ${componentName};

export * from ".";`,
    'index.vue': `<template>
  <div class='example-wrap'>
    <${componentName}>这是一个 ${camelCaseDir} 组件</${componentName}>
  </div>
</template>

<script>
import ${componentName} from "./${camelCaseDir}.vue";

export default {
  components: {
    ${componentName},
  },
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
.example-wrap {
  width: 100%;
  padding: 20px;
  height: 1100px;
  display: block;
}
</style>`,
    'props.js': `export default {

}`,
    'index.scss': `@import "../common/bem.scss";

@include block(${dir}) {
  
}`,
  [`${dir}.vue`]: `<template>
  <div :class="\`\${prefixClass}\`" :style="styles" >
    <slot></slot>
  </div>
</template>

<script>
import props from './props.js';

export default {
  name: '${prefix}-${dir}',
  props: { 
    ...props
  },
  data() {
    return {
      prefixClass: '${prefix}-${dir}',
    }
  },
  computed: {
    styles() {
      const style = {

      }
      return style;
    },
  },
}
</script>

<style lang="scss">
@import "./index.scss";
</style>`,
  };

  Object.entries(fileContentMap).forEach(([fileName, content]) => {
    createFile(fileName, content);
  });
  
  console.log(`${componentName} 组件创建成功`)
}