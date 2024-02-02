<template>
    <div :class="`${prefixClass}`">
        <span v-if="showLabel && label" :class="`${prefixClass}__label`" >{{ label }}</span>
        <div :class="`${prefixClass}__content`">
            <div :class="`${prefixClass}__content-begin`" :style="{
                '--input-inner-width': startInputWidth
            }" @mouseenter="mouseenterStart = true" @mouseleave="mouseenterStart = false">
                <prefix-icon v-if="showPrefixIcon"  @click.native="$refs['start-date-picker'].focus()" :class="`${prefixClass}__prefix`" />
                <el-date-picker 
                    ref="start-date-picker"
                    v-model="value[startField]" 
                    :value-format="valueFormat" 
                    :editable='editable' 
                    :clearable="clearable"
                    :placeholder="startPlaceholder"
                    :append-to-body="appendToBody"
                    :popper-class="`${popperClass} ${prefixClass}__popper ${prefixClass}__popper-start`"
                    :picker-options="startPickerOptions"
                    @change="handleStartDateChange"
                    @focus="handleStartDateFocus"
                />
                <suffix-icon v-if="showSuffixIcon" v-show="!showStartClearIcon" :class="`${prefixClass}__suffix`"/>
                <clear-icon @click.native="clear(startField)" v-show="showStartClearIcon" :class="`${prefixClass}__clear-icon`"/>
            </div>
            <span v-if="value[endField] != null" :class="`${prefixClass}__content-separator`">{{ separator }}</span>
            <div 
                v-if="value[endField] != null" :class="`${prefixClass}__content-end`" 
                :style="{ '--input-inner-width': endInputWidth}"
                @mouseenter="mouseenterEnd = true" @mouseleave="mouseenterEnd = false"
                >
                <prefix-icon v-if="showPrefixIcon" @click.native="$refs['end-date-picker'].focus()" :class="`${prefixClass}__prefix`" />
                <el-date-picker
                    ref="end-date-picker"
                    v-model="value[endField]" 
                    :value-format="valueFormat" 
                    :editable='editable' 
                    :clearable="clearable"
                    :placeholder="endPlaceholder"
                    :append-to-body="appendToBody"
                    :popper-class="`${prefixClass}__popper ${prefixClass}__popper-end`"
                    :picker-options="endPickerOptions"
                    @change="handleEndDateChange"
                    @focus="handleEndDateFocus"
                />
                <suffix-icon v-if="showSuffixIcon" v-show="!showEndClearIcon" :class="`${prefixClass}__suffix`"/>
                <clear-icon @click.native="clear(endField)" v-show="showEndClearIcon" :class="`${prefixClass}__clear-icon`"/>
            </div>
        </div>
    </div>
</template>


<script >
import {
    ClearIcon,
    SuffixIcon,
    PrefixIcon,
} from '../icons'
import props from './props';

export default {
    name: 'yt-date-picker-range',
    components: {
        ClearIcon,
        SuffixIcon,
        PrefixIcon,
    },
    props: {
        ...props,
    },
    data() {
        return {
            prefixClass: 'yt-date-picker-range',
            isModifyStartMonthCell: false,
            isModifyEndMonthCell: false,
            mouseenterStart: false,
            mouseenterEnd: false,
            startPickerOptions: {
                disabledDate: (time) => {
                    const endDate = this.value[this.endField]
                    if (endDate) {
                        return time.getTime() > new Date(endDate);
                    }
                },
            },
            endPickerOptions: {
                disabledDate: (time) => {
                    const startDate = this.value[this.startField]
                    if (startDate) {
                        return time.getTime() < new Date(startDate);
                    }
                }
            }
        }
    },
    computed: {
        startInputWidth() {
            if (!this.isInputFitContent) {
                return '100%';
            }
            return `${this.value[this.startField] ? this.dateWidth : this.placeholderWidth}px`;
        },
        endInputWidth() {
            if (!this.isInputFitContent) {
                return '100%';
            }
            return `${this.value[this.endField] ? this.dateWidth : this.placeholderWidth}px`;
        },

        showStartClearIcon() {
            return this.clearable && this.value[this.startField] && this.mouseenterStart;
        },
        showEndClearIcon() {
            return this.clearable && this.value[this.endField] && this.mouseenterEnd;
        },
    },
    methods: {
        handleStartDateChange(date) {
            this.$emit('start-change', date);
        },
        handleEndDateChange(date) {
            this.$emit('end-change', date);
        },
        handleStartDateFocus(instance) {
            if (!this.isModifyStartMonthCell) {
                this.modifyMonthCell()
                this.isModifyStartMonthCell = true;
            }
            this.$emit('start-focus', instance)
        },
        handleEndDateFocus(instance) {
            if (!this.isModifyEndMonthCell) {
                this.modifyMonthCell()
                this.isModifyEndMonthCell = true;
            }
            this.$emit('end-focus', instance);
        },
        modifyMonthCell() {
            this.$nextTick(() => {
                const poppers = Array.from(document.body.querySelectorAll(`.${this.prefixClass}__popper`));
                poppers.forEach((popper) => {
                    const cells = Array.from(popper.querySelectorAll('.el-month-table .cell'));
                    cells.forEach((cell, index) => {
                        cell.textContent = `${index + 1}月`;
                    });
                });
            })
        },
        clear(field) {
            this.value[field] = '';
        }
    }
}

</script>

<style lang='scss'>
@import './index.scss';
</style>