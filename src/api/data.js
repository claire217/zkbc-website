import axios from '@/libs/api.request';

// 首页列表
export const getEchartsData = form => {
  return axios.request({
    url: '/report/loan/loanStatis',
    params: form,
    method: 'get'
  });
};

// 手机截图展示列表
export const getPhoneEchartsData = form => {
  return axios.request({
    url: '/report/mobile/screenshot',
    params: form,
    method: 'post'
  });
};

// 用户管理列表
export const getUserTableData = form => {
  return axios.request({
    url: '/report/user/list',
    params: form,
    method: 'post'
  });
};

// 添加用户
export const ADD_USER_DATA = form => {
  return axios.request({
    url: '/report/user/add',
    data: form,
    method: 'post'
  });
};

// 用户登录名唯一性
export const USER_NA_EXIST = form => {
  return axios.request({
    url: '/report/user/notexists',
    params: form,
    method: 'post'
  });
};

// 修改用户数据回显
export const VIEW_USER_DATA = form => {
  return axios.request({
    url: '/report/user/view',
    params: form,
    method: 'post'
  });
};

// 修改用户
export const UPDATE_USER_DATA = form => {
  return axios.request({
    url: '/report/user/update',
    data: form,
    method: 'post'
  });
};

// 删除用户
export const DELETE_USER_DATA = form => {
  return axios.request({
    url: '/report/user/remove',
    params: form,
    method: 'post'
  });
};

// 状态修改 激活/失效
export const ACTIVE_USER_DATA = form => {
  return axios.request({
    url: '/report/user/updateStatus',
    params: form,
    method: 'post'
  });
};

// 用户密码重置
export const RE_PWD_USER_DATA = form => {
  return axios.request({
    url: '/report/user/reset-login-password',
    params: form,
    method: 'post'
  });
};

// 角色列表
export const getRoleTableData = form => {
  return axios.request({
    url: '/report/role/list',
    params: form,
    method: 'post'
  });
};

// 角色名称是否存在
export const ROLE_NA_EXIST = form => {
  return axios.request({
    url: '/report/role/notexists',
    params: form,
    method: 'post'
  });
};

// 角色添加
export const ADD_ROLE_DATA = form => {
  return axios.request({
    url: '/report/role/add',
    params: form,
    method: 'post'
  });
};

// 角色修改
export const UPDATE_ROLE_INFO_DATA = form => {
  return axios.request({
    url: '/report/role/update',
    params: form,
    method: 'post'
  });
};

// 删除
export const DELETE_ROLE_DATA = form => {
  return axios.request({
    url: '/report/role/remove',
    params: form,
    method: 'post'
  });
};

// 状态修改 激活 失效
export const ACTIVE_ROLE_DATA = form => {
  return axios.request({
    url: '/report/role/updateStatus',
    params: form,
    method: 'post'
  });
};

// 权限管理
export const getTreeRoleList = () => {
  return axios.request({
    url: '/cu/curos/rorislist',
    method: 'get'
  });
};

// 添加数据权限
export const getDataPermission = (form) => {
  return axios.request({
    url: '/report/userdata/add',
    params: form,
    method: 'post'
  });
};

// 回显数据权限
export const getDataView = (form) => {
  return axios.request({
    url: '/report/userdata/list',
    params: form,
    method: 'post'
  });
};

// 权限回显
export const viewTreeRoleList = (form) => {
  return axios.request({
    url: '/report/role/permissions-view',
    params: form,
    method: 'post'
  });
};

// 修改权限
export const updateTreeRoleList = (form) => {
  return axios.request({
    url: '/report/role/permissions-update',
    data: form,
    method: 'post'
  });
};

// 客户管理列表
export const getCustomerTableData = form => {
  return axios.request({
    url: '/report/loan/user',
    params: form,
    method: 'post'
  });
};

// 贷款申请列表
export const getLoanApplicationData = form => {
  return axios.request({
    url: '/report/loan/loanlist',
    params: form,
    method: 'post'
  });
};

// 账号修改记录列表
export const getChangeRecordData = form => {
  return axios.request({
    url: 'get-change-record-data',
    params: form,
    method: 'get'
  });
};

// 贷款发放列表
export const getLoanPayData = form => {
  return axios.request({
    url: '/report/loan/loanDetailList',
    params: form,
    method: 'post'
  });
};

// 还款记录查询列表
export const getRepaymentRecordData = form => {
  return axios.request({
    url: '/report/loan/loanRepayDetailList',
    params: form,
    method: 'post'
  });
};

// 联贷还款记录
export const getLoanRepaymentRecord = form => {
  return axios.request({
    url: '/report/loan/assetRepay',
    params: form,
    method: 'post'
  });
};

// 贷款发放列表 还款记录查询列表 搜索
export const seatchListData = form => {
  return axios.request({
    url: '/report/loan/search',
    params: form,
    method: 'post'
  });
};

// 放款成功查询列表
export const getSuccessLoanData = form => {
  return axios.request({
    url: 'get-successful-loan-data',
    params: form,
    method: 'get'
  });
};

// 还款计划查询列表
export const getRepaymentPlanInquiry = form => {
  return axios.request({
    url: '/report/loan/loanRepayPlanList',
    params: form,
    method: 'post'
  });
};

// 逾期列表
export const getOverLoan = form => {
  return axios.request({
    url: '/report/loan/loanOverList',
    params: form,
    method: 'post'
  });
};

// 理赔通知
export const getClaimNotification = () => {
  return axios.request({
    url: 'get_claim_notification',
    method: 'get'
  });
};

// 理赔申请
export const getClaimApplication = (form) => {
  return axios.request({
    url: '/report/claim/apply',
    params: form,
    method: 'post'
  });
};

// 理赔确认
export const getClaimConfirmation = (form) => {
  return axios.request({
    url: '/report/claim/confirm',
    params: form,
    method: 'post'
  });
};

// 理赔扣款结果
export const getResultClaimDeduction = form => {
  return axios.request({
    url: '/report/claim/result',
    params: form,
    method: 'post'
  });
};

// 理赔结余明细
export const getClaimBalanceDetails = () => {
  return axios.request({
    url: 'get-claim-balance-details',
    method: 'get'
  });
};

// 运营统计
export const getDailyBalanceDetails = (form) => {
  return axios.request({
    url: '/report/opersta',
    data: form,
    method: 'post'
  });
};

// 资产方统计
export const getAssetStatistics = () => {
  return axios.request({
    url: 'get-asset-statistics',
    method: 'get'
  });
};

// 渠道统计
export const getFundingStatistics = form => {
  return axios.request({
    url: '/report/channel',
    data: form,
    method: 'post'
  });
};

// 资金方设置
export const getFundingSetting = () => {
  return axios.request({
    url: 'get-funding-setting',
    method: 'get'
  });
};

// 资产方设置
export const getAssetSettings = () => {
  return axios.request({
    url: 'get-asset-settings',
    method: 'get'
  });
};

// 权限菜单
export const getRoleMenu = id => {
  return axios.request({
    url: '/cu/curess/rorismenu/' + id,
    method: 'get'
  });
};

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  });
};

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  });
};
// 按期数统计
export const getPeriodicStatistics = (form) => {
  return axios.request({
    url: '/report/loanTerm',
    data: form,
    method: 'post'
  });
};

// 逾期借款
export const getOverdueLoan = () => {
  return axios.request({
    url: 'get-overdue-loan',
    method: 'post'
  });
};

// 渠道审批率
export const getChannelApprovalRate = form => {
  return axios.request({
    url: '/report/channel/approvalRatio',
    data: form,
    method: 'post'
  });
};

// 产品审批率
export const getProductApprovalRate = (form) => {
  return axios.request({
    url: '/report/product/approvalRatio',
    data: form,
    method: 'post'
  });
};

// 月度放款
export const getMonthlyLending = (form) => {
  return axios.request({
    url: '/report/month/count',
    data: form,
    method: 'post'
  });
};

// 用户统计
export const getUserStatistics = () => {
  return axios.request({
    url: 'get-user-statistics',
    method: 'post'
  });
};

// 日交易信息查询
export const getDailyTradingInformation = (form) => {
  return axios.request({
    url: '/report/trade/dayTrade',
    params: form,
    method: 'post'
  });
};

// 日终余额统计
export const getEndBalanceStatistics = (form) => {
  return axios.request({
    url: '/report/trade/dayBalance',
    params: form,
    method: 'post'
  });
};

// 还款差错账列表
export const getPaymentErrorList = (form) => {
  return axios.request({
    url: '/report/repay/errorAccount',
    params: form,
    method: 'post'
  });
};

// 全景展示
export const getPanoramicPresentationReport = (form) => {
  return axios.request({
    url: '/report/whole/count',
    params: form,
    method: 'post'
  });
};

// 逾期统计
export const getOverdueStatistics = (form) => {
  return axios.request({
    url: '/report/repay/getOverDetailList',
    params: form,
    method: 'post'
  });
};

// 逾期率统计
export const getOverdueStatisticsRate = (form) => {
  return axios.request({
    url: '/report/repay/getOverDetailListByTerm',
    params: form,
    method: 'post'
  });
};

// 还款统计
export const getRepaymentStatistics = (form) => {
  return axios.request({
    url: '/report/repay/getRepayDetailList',
    params: form,
    method: 'post'
  });
};

// 还款计划
export const getRepaymentPlan = (form) => {
  return axios.request({
    url: '/report/repay/plan',
    params: form,
    method: 'post'
  });
};

// 闪银奇异
export const getSilverStrange = (form) => {
  return axios.request({
    url: '/report/finance/list',
    params: form,
    method: 'post'
  });
};

// 闪银奇异配置起始金额回显
export const paramUpperLimit = () => {
  return axios.request({
    url: '/report/sysvar/parameterUpperLimit',
    method: 'post'
  });
};

// 闪银奇异配置
export const silverSettingList = (form) => {
  return axios.request({
    url: '/report/sysvar/list',
    params: form,
    method: 'post'
  });
};

// 闪银奇异配置新增
export const addSilverSetting = (form) => {
  return axios.request({
    url: '/report/sysvar/add',
    params: form,
    method: 'post'
  });
};

// 运营图表累计放款及余额分析
export const REPORTCOUNT = (form) => {
  return axios.request({
    url: '/report/week/count',
    params: form,
    method: 'post'
  });
};

// 运营图表期数放款比例
export const REPORTTERM = (form) => {
  return axios.request({
    url: '/report/term/count',
    params: form,
    method: 'post'
  });
};

// 日终余额对账
export const getEndBalanceRec = (form) => {
  return axios.request({
    url: '/report/daybalance/account',
    params: form,
    method: 'post'
  });
};

// 分润配置列表
export const getDistrList = (form) => {
  return axios.request({
    url: '/report/profit/list',
    params: form,
    method: 'post'
  });
};

// 分润配置列表--新增
export const distrAdd = (form) => {
  return axios.request({
    url: '/report/profit/add',
    data: form,
    method: 'post'
  });
};

// 分润配置列表--修改
export const distrEdit = (form) => {
  return axios.request({
    url: '/report/profit/update',
    data: form,
    method: 'post'
  });
};

// 分润配置列表--删除
export const distrDelete = (form) => {
  return axios.request({
    url: ' /report/profit/delete',
    params: form,
    method: 'post'
  });
};

// 报表异常--生成
export const reportExcelRebuilt = form => {
  return axios.request({
    url: '/report/excel/rebuilt',
    params: form,
    method: 'post'
  });
};

// 报表异常--发送
export const reportExcelSend = () => {
  return axios.request({
    url: '/report/excel/send',
    method: 'post'
  });
};

// 报表异常--下载前查询是否生成

export const reportExcelDownSearch = () => {
  return axios.request({
    url: '/report/excel/search',
    method: 'post'
  });
};

// 获取服务器时间

export const getServiceTime = () => {
  return axios.request({
    url: '/report/excel/getDateTime',
    method: 'post'
  });
};

// 资产方列表字典项
export const channelNameList = () => {
  return axios.request({
    url: '/report/sys/par',
    method: 'post'
  });
};

// 授信限额/放款限额列表
export const loanLimitList = (form) => {
  return axios.request({
    url: '/report/quota/list',
    params: form,
    method: 'post'
  });
};

// 授信限额/放款限额列表--添加
export const loanLimitAdd = (form) => {
  return axios.request({
    url: '/report/quota/add',
    data: form,
    method: 'post'
  });
};

// 授信限额/放款限额列表--添加--资产方唯一
export const loanLimitOnly = (form) => {
  return axios.request({
    url: '/report/quota/exists',
    data: form,
    method: 'post'
  });
};

// 授信限额/放款限额列表--修改
export const loanLimitUpdate = (form) => {
  return axios.request({
    url: '/report/quota/update',
    data: form,
    method: 'post'
  });
};

// 当日限额查询
export const limitQueryDay = (form) => {
  return axios.request({
    url: '/report/quota/queryDay',
    params: form,
    method: 'post'
  });
};

// 当月限额查询
export const limitQueryMonth = (form) => {
  return axios.request({
    url: '/report/quota/queryMonth',
    params: form,
    method: 'post'
  });
};

// 渠道名称配置
export const getChannelList = (form) => {
  return axios.request({
    url: '/report/gchannel/list',
    params: form,
    method: 'post'
  });
};

// 渠道名称添加
export const channelAdd = form => {
  return axios.request({
    url: '/report/gchannel/add',
    data: form,
    method: 'post'
  });
};

// 渠道名称修改
export const updateChannel = form => {
  return axios.request({
    url: '/report/gchannel/update',
    data: form,
    method: 'post'
  });
};

// 渠道名称删除
export const channelDelete = form => {
  return axios.request({
    url: '/report/gchannel/delete',
    params: form,
    method: 'post'
  });
};

// 渠道编码检验唯一性
export const channelNumberOnly = (form) => {
  return axios.request({
    url: '/report/gchannel/exists',
    data: form,
    method: 'post'
  });
};

// 产品名称配置
export const getProductList = (form) => {
  return axios.request({
    url: '/report/product/list',
    params: form,
    method: 'post'
  });
};

// 产品名称添加
export const addProduct = form => {
  return axios.request({
    url: '/report/product/add',
    data: form,
    method: 'post'
  });
};

// 产品名称修改
export const updateProduct = form => {
  return axios.request({
    url: '/report/product/update',
    data: form,
    method: 'post'
  });
};

// 产品名称删除
export const productDelete = form => {
  return axios.request({
    url: '/report/product/delete',
    params: form,
    method: 'post'
  });
};

// 产品编码检验唯一性
export const productNumberOnly = (form) => {
  return axios.request({
    url: '/report/product/exists',
    data: form,
    method: 'post'
  });
};

// 资金方名称配置
export const getDistList = (form) => {
  return axios.request({
    url: '/report/bank/list',
    params: form,
    method: 'post'
  });
};

// 资金方名称添加
export const addDist = form => {
  return axios.request({
    url: '/report/bank/add',
    data: form,
    method: 'post'
  });
};

// 资金方名称修改
export const updateDist = form => {
  return axios.request({
    url: '/report/bank/update',
    data: form,
    method: 'post'
  });
};

// 资金方名称删除
export const distDelete = form => {
  return axios.request({
    url: '/report/bank/delete',
    params: form,
    method: 'post'
  });
};

// 资金方编码检验唯一性
export const distNumberOnly = (form) => {
  return axios.request({
    url: '/report/bank/exists',
    data: form,
    method: 'post'
  });
};

// 放款对账
export const getLoanReconciliation = (form) => {
  return axios.request({
    url: '/report/datacheck/list',
    data: form,
    method: 'post'
  });
};

// 还款对账
export const getRepaymentReconciliation = (form) => {
  return axios.request({
    url: '/report/datacheck/list',
    data: form,
    method: 'post'
  });
};

// 理赔申请对账
export const getClaimAppReconciliation = (form) => {
  return axios.request({
    url: '/report/datacheck/list',
    data: form,
    method: 'post'
  });
};

// 理赔确认对账
export const getClaimConReconciliation = (form) => {
  return axios.request({
    url: '/report/datacheck/list',
    data: form,
    method: 'post'
  });
};

// 理赔结果对账
export const getClaimResultReconciliation = (form) => {
  return axios.request({
    url: '/report/datacheck/list',
    data: form,
    method: 'post'
  });
};
