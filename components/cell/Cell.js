// components/cell/Cell.js
import { HOST, getToken, setToken, serviceApi } from '../../utils/util.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {            // 属性名
      type: String,     // 类型（必填）
      value: ''     // 属性初始值（可选）
    },
    content: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
