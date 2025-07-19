<template>
    <el-table-column :key="column.field" :prop="column.field" :min-width="column.colMinW || 150">
        <template slot="header">
            <span>
                {{ column.label }}
            </span>
            <span class="required-mark" v-if="column.required">*</span>
        </template>
        <template v-if="hasSubColumns">
            <dynamic-column v-for="subCol in column.subColumnList" :level="level + 1" :key="subCol.field" :column="subCol"
                @change="handleChange"></dynamic-column>
        </template>
        <template slot-scope="scope">
            <template v-if="column.isEditable && column.isEditable(scope.row, column)">
                <el-input :ref="getEditingKey(scope.row, column)"
                    :value="getNestedValue(scope.row, column)"
                    placeholder="请输入"
                    @change="(event) => handleChange(event, scope.row, column)" size="small" />
            </template>
            <span v-else>
                {{ getNestedValue(scope.row, column) }}
            </span>
        </template>
    </el-table-column>
</template>

<script>
import { TableColumn as ElTableColumn, Input as ElInput } from 'element-ui';
export default {
    name: 'DynamicColumn',
    components: {
        ElTableColumn,
        ElInput,
    },
    props: {
        column: {
            type: Object,
            required: true,
        },
        level: {
            type: Number,
            default: 0,
        },
        rowData: {
            type: Object,
            default: null,
        }
    },
    data() {
        return {
            editingValues: {}
        }
    },
    computed: {
        hasSubColumns() {
            return this.column.subColumnList && this.column.subColumnList.length > 0;
        },
    },
    watch() {
        
    }, 
    methods: {
        handleChange(row, col) {
            // this.setNestedValue(row, col, newValue);
            // 行数据 + 列字段信息
            this.$emit('cell-change', {
                row,
                col,
                value: newValue,
            });
        },
        getNestedValue(row, col) {
            console.error('row', row, col)
            return col.field.split('.').reduce((obj, key) => {
                return (obj && obj[key] !== undefined) ? obj[key] : '';
            }, row);
        },
        setNestedValue(row, col, value) {
            const keys = col.field.split('.');
            const lastKey = keys.pop();
            let obj = row;
            
            keys.forEach(key => {
                if (obj[key] === undefined || obj[key] === null) {
                obj[key] = {};
                }
                obj = obj[key];
            });
            
            this.$set(obj, lastKey, value);
        },
        getEditingKey(row, col) {
            return `${row.id}_${col.field}`;
        },
        handleCellBlur(row, column, subCol) {
            let value = row[column.field][subCol.field];
            let errorMsg = '';
            const numValue = Number(value);
            // 验证范围
            if (value === '' || value == null) {
                errorMsg = '不能为空'
            } else if (numValue < 0 || Number.isNaN(numValue)) {
                errorMsg = '只能是非负数值'
            } else if (numValue > subCol.maxValue) {
                errorMsg = `不能超过${subCol.maxValue}`;
            } else {
                value = numValue;
            }
            row[column.field][subCol.field] = value;
            if (!row[column.field].validResult) {
                this.$set(row[column.field], 'validResult', {})
            }
            if (subCol.field) {
                this.$set(row[column.field].validResult, `${subCol.field}`, {
                    valid: false,
                    msg: '',
                })
            }
            row[column.field].validResult[subCol.field].valid = !Boolean(errorMsg);
            row[column.field].validResult[subCol.field].msg = errorMsg;
            // 行数据 + 列字段信息
            this.$emit('change', {
                row,
                columnField: column.field,
                subColField: subCol.field,
            });
        },
        handleCellInput(row, column, subCol) {
            let value = row[column.field][subCol.field];
            const reg = new RegExp(`^\\d+(?:\\.\\d{0,${2}})?`);
            if (reg.test(value)) {
                value = value.match(new RegExp(`^\\d+(?:\\.\\d{0,${2}})?`))[0];
            }
            row[column.field][subCol.field] = value;
            if (!row[column.field].validResult) {
                this.$set(row[column.field], 'validResult', {})
            }
            if (subCol.field) {
                this.$set(row[column.field].validResult, `${subCol.field}`, {
                    valid: false,
                    msg: '',
                })
            }
            row[column.field].validResult[subCol.field].valid = true;
            row[column.field].validResult[subCol.field].msg = ''
        },
    }
}
</script>

