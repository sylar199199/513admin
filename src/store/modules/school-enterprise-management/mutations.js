import * as types from '@store/modules/school-enterprise-management/mutation-types'

const schoolLevelMap = [
  {
    label: '普通',
    value: '1',
  },
  {
    label: '会员',
    value: '2',
  },
]

export default {
  // 设置account list
  [types.SET_ACCOUNT_LIST_DATA](state, { accountListData }) {
    state.accountListData = accountListData
  },
  /**
   * 设置cuurent学校信息 处理数据
   * @param {*} state
   * @param {*} { currentSchoolData }
   */
  [types.SET_CURRENT_SCHOOL_DATA](state, { currentSchoolData }) {
    const {
      contractEndTime,
      contractStartTime,
      schoolLevel,
      typeId,
      ...data
    } = currentSchoolData
    const schoolLevelItem = schoolLevelMap.find(
      item => item.label === schoolLevel,
    )

    state.currentSchoolData = {
      date: [contractStartTime, contractEndTime],
      schoolLevel: (schoolLevelItem && schoolLevelItem.value) || '1',
      typeIdSign: typeId,
      ...data,
    }
  },
  [types.RESET_CURRENT_SCHOOL_DATA](state) {
    state.currentSchoolData = {}
  },
}
