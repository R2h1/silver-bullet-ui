import DatePicker from './date-picker.vue';

DatePicker.install = function(Vue) {
    Vue.component(DatePicker.name, DatePicker)
}
export const YtDatePicker = DatePicker;

export default DatePicker;

export * from ".";