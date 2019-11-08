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
          <d2-bar>
            <d2-bar-space/>
            <d2-bar-cell>
              <el-button-group>
                { this.vNodeButtonSearch }
                { this.vNodeButtonTableColumnsFilterTrigger }
              </el-button-group>
            </d2-bar-cell>
            <d2-bar-cell>
              { this.vNodeButtonCreateWithParentId0 }
            </d2-bar-cell>
          </d2-bar>
        </template>
        { this.vNodeTable }
        <form ref="form" on-success={ this.research }/>
        { this.vNodeTableColumnsFilter }
      </d2-container>
    return page
  },
  data () {
    return {
      api: {
        index: 'MENU_ALL',
        delete: 'MENU_DELETE'
      }
    }
  },
  computed: {
    // 配置项
    // 表格列
    // [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [show]
    settingColumns () {
      return [
        { prop: 'menu_name', label: '名称', minWidth: '200px', fixed: 'left' },
        { prop: 'icon', label: '图标', render: ({ row }) => row.icon ? <d2-icon name={ row.icon }></d2-icon> : <span>无</span>, width: '50px' },
        { prop: 'url', label: '地址', minWidth: '200px' },
        { prop: 'perms', label: '权限标识', width: '200px' },
        { prop: 'id', label: 'ID', width: '50px', show: false },
        { prop: 'menu_type', label: '类型', render: ({ row }) => <d2-dict name="menu_type" value={ row.menu_type }/>, width: '50px' },
        { prop: 'visible', label: '可见', render: ({ row }) => <d2-dict name="visible" value={ row.visible }/>, width: '50px' },
        { prop: 'created_by', label: '创建人员', width: '100px', show: false },
        { prop: 'created_at', label: '创建时间', formatter: row => utils.time.format(row.created_at, 'YYYY/M/D HH:mm:ss'), width: '140px', show: false },
        { prop: 'updated_by', label: '更新人员', width: '100px', show: false },
        { prop: 'updated_at', label: '更新时间', formatter: row => utils.time.format(row.updated_at, 'YYYY/M/D HH:mm:ss'), width: '140px', show: false },
        { prop: 'remark', label: '备注', width: '200px', show: false }
      ]
    },
    // 配置项
    // 表格操作列
    // [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [show]
    settingActions () {
      return [
        {
          label: '操作',
          align: 'center',
          width: '120px',
          fixed: 'right',
          render: ({ row }) => {
            const actions = [
              {
                icon: 'el-icon-edit-outline',
                action: () => this.edit(row.id)
              },
              {
                icon: 'el-icon-plus',
                type: 'primary',
                action: () => this.create({
                  parent_id: row.id
                })
              },
              {
                icon: 'el-icon-delete',
                type: 'danger',
                confirm: `确定删除 [ ${row.menu_name} ] 吗`,
                action: () => this.delete(row.id)
              }
            ]
            return <d2-table-actions actions={ actions }/>
          }
        }
      ]
    }
  }
}
