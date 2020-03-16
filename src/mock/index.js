import Mock from 'mockjs';
import { login, logout, getUserInfo } from './login';
import { getHomeData, getRoleTableData, getUserTableData, getCustomerTableData, getOverLoan, getClaimNotification, getClaimApplication, getClaimConfirmation, getResultClaimDeduction,
  getClaimBalanceDetails, getLoanApData, getChangeRecordData, getLoanPayData, getRepaymentRecordData,
  getSuccessfulLoanData, getDailyBalanceDetails, getAssetStatistics, getFundingStatistics, getFundingSetting, getAssetSettings,
  getPeriodicStatistics, getMonthlyLending } from './data';

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
});

// 登录相关和获取用户信息
Mock.mock(/\/get_home_data/, getHomeData);
Mock.mock(/\/login/, login);
Mock.mock(/\/get_info/, getUserInfo);
Mock.mock(/\/logout/, logout);
Mock.mock(/\/get_user_table_data/, getUserTableData);
Mock.mock(/\/get_role_table_data/, getRoleTableData);
Mock.mock(/\/get_customer_table_data/, getCustomerTableData);
Mock.mock(/\/get_over_loan/, getOverLoan);
Mock.mock(/\/get_claim_notification/, getClaimNotification);
Mock.mock(/\/get_claim_application/, getClaimApplication);
Mock.mock(/\/get_claim_confirmation/, getClaimConfirmation);
Mock.mock(/\/get-result-claim-deduction/, getResultClaimDeduction);
Mock.mock(/\/get-claim-balance-details/, getClaimBalanceDetails);
Mock.mock(/\/get-loan-ap-data/, getLoanApData);
Mock.mock(/\/get-change-record-data/, getChangeRecordData);
Mock.mock(/\/get-loan-pay-data/, getLoanPayData);
Mock.mock(/\/get-repayment-record-data/, getRepaymentRecordData);
Mock.mock(/\/get-successful-loan-data/, getSuccessfulLoanData);
Mock.mock(/\/get-daily-balance-details/, getDailyBalanceDetails);
Mock.mock(/\/get-asset-statistics/, getAssetStatistics);
Mock.mock(/\/get-funding-statistics/, getFundingStatistics);
Mock.mock(/\/get-funding-setting/, getFundingSetting);
Mock.mock(/\/get-asset-settings/, getAssetSettings);
Mock.mock(/\/get-periodic-statistics/, getPeriodicStatistics);
Mock.mock(/\/get-monthly-lending/, getMonthlyLending);

export default Mock;
