import utils from '@/utils'
import table from '@/mixins/crud.table.js'
import componentForm from './form'

export default {
  mixins: [ table ],
  components: { componentForm },
  render () {
    const page =
      <d2-container spacious>
        <template slot="header">
          <d2-search-panel vModel={ this.search.panel.active }>
            <d2-bar slot="title">
              <d2-bar-space/>
              <d2-bar-cell>
                { this.vNodePaginationMini }
              </d2-bar-cell>
              <d2-bar-space/>
              <d2-bar-cell>
                <el-button-group>
                  { this.vNodeButtonSearch }
                  { this.vNodeButtonTableColumnsFilterTrigger }
                </el-button-group>
              </d2-bar-cell>
              <d2-bar-cell>
                { this.vNodeButtonCreate }
              </d2-bar-cell>
            </d2-bar>
            { this.vNodeSearchForm }
          </d2-search-panel>
        </template>
        { this.vNodeTable }
        <d2-bar slot="footer">
          <d2-bar-cell>
            { this.vNodePaginationFull }
          </d2-bar-cell>
          <d2-bar-space/>
        </d2-bar>
        <form ref="form" on-success={ this.research }/>
        { this.vNodeTableColumnsFilter }
      </d2-container>
    return page
  },
  data () {
    return {
      api: {
        index: 'POST_ALL',
        delete: 'POST_DELETE'
      }
    }
  },
  computed: {
    // 配置项
    // 表格列
    // [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [show]
    settingColumns () {
      return [
        { prop: 'post_name', label: '岗位名称', minWidth: '100px', fixed: 'left' },
        { prop: 'post_code', label: '岗位编码', minWidth: '100px' },
        { prop: 'post_sort', label: '显示顺序', minWidth: '100px', show: false },
        { prop: 'status', label: '状态', width: '100px', show: false },
        { prop: 'remark', label: '备注', width: '100px', show: false },
        { prop: 'create_by', label: '创建人员', width: '100px', show: false },
        { prop: 'created_at', label: '创建时间', width: '200px', formatter: row => utils.time.format(row.created_at, 'YYYY/M/D HH:mm:ss'), show: false },
        { prop: 'update_by', label: '更新人员', width: '100px', show: false },
        { prop: 'updated_at', label: '更新时间', width: '200px', formatter: row => utils.time.format(row.updated_at, 'YYYY/M/D HH:mm:ss'), show: false }
      ].map(setting => {
        setting.sortable = 'custom'
        return setting
      })
    },
    // 配置项
    // 表格操作列
    // [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [show]
    settingActions () {
      return [
        {
          label: '操作',
          align: 'center',
          width: '90px',
          fixed: 'right',
          render: ({ row }) => {
            const actions = [
              { icon: 'el-icon-edit-outline', action: () => this.edit(row.id) },
              { icon: 'el-icon-delete', type: 'danger', confirm: `确定删除 [ ${row.post_name} ] 吗`, action: () => this.delete(row.id) }
            ]
            return <d2-table-actions actions={ actions }/>
          }
        }
      ]
    },
    // 配置项
    // 搜索
    // [prop] -> [label] -> [default] -> [render]
    settingSearch () {
      return [
        {
          prop: 'post_name',
          label: '岗位名称',
          default: '',
          render: <el-input vModel={ this.search.form.model.post_name } style="width:100px;"/>
        },
        {
          prop: 'status',
          label: '状态',
          default: 0,
          render: <d2-dict-select vModel={ this.search.form.model.status } name="status" style="width:100px;" all/>
        }
      ]
    }
  }
}
