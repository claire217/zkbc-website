import Mock from 'mockjs';
import { doCustomTimes } from '@/libs/util';

export const getHomeData = req => {
  let homeTableData = [];
  doCustomTimes(5, () => {
    homeTableData.push(Mock.mock({
      channelNa: '@name',
      applicationNums: '@number',
      approvalsNums: '@number',
      loansNums: '@number',
      applicationAmount: '@number',
      loansAmount: '@number',
      loanBalance: '@number'
    }));
  });
  return homeTableData;
};

export const getLoanApData = req => {
  let loanApData = [];
  doCustomTimes(5, () => {
    loanApData.push(Mock.mock({
      apNo: '@number',
      chaNa: '@number',
      proNa: '@name',
      funderNa: '@name',
      cuNo: '@string',
      cuNa: '@name',
      cardNo: '@number',
      apAmount: '@number',
      apTerm: '@number',
      loanUse: '@number',
      apDay: '@string',
      riskScore: '@number',
      apSt: '@number',
      changeRecord: '有'
    }));
  });
  return loanApData;
};

export const getChangeRecordData = req => {
  let changeRecordData = [];
  doCustomTimes(5, () => {
    changeRecordData.push(Mock.mock({
      acUse: '@number',
      coTy: '@number',
      acNum: '@name',
      acNa: '@name',
      acPhone: '@string',
      acTy: '@name',
      bankNa: '@number',
      superBankNum: '@number',
      acUnionPay: '@number',
      interBankNum: '@number'
    }));
  });
  return changeRecordData;
};

export const getLoanPayData = req => {
  let loanPayData = [];
  doCustomTimes(5, () => {
    loanPayData.push(Mock.mock({
      apNo: '@number',
      chaNa: '@number',
      broNa: '@name',
      coNo: '@number',
      proNa: '@name',
      funderNa: '@name',
      cuNa: '@string',
      payTy: '@name',
      payDay: '@date',
      apAmount: '@number',
      loanAmount: '@number',
      loanStartDay: '@date',
      loanDueDay: '@date',
      loanResult: '@number',
      failReson: '@string'
    }));
  });
  return loanPayData;
};

export const getRepaymentRecordData = req => {
  let loanPayData = [];
  doCustomTimes(5, () => {
    loanPayData.push(Mock.mock({
      serialNo: '@number',
      borNo: '@number',
      funderNa: '@name',
      repayTy: '@number',
      repayDay: '@name',
      repayAmount: '@name',
      repayPrincipal: '@string',
      repayInterest: '@name',
      repayPenaltyInterest: '@date',
      repayDefault: '@number',
      interestWaiver: '@number',
      defaultReduction: '@date',
      repaySt: '@string',
      failReson: '@date'
    }));
  });
  return loanPayData;
};

export const getSuccessfulLoanData = req => {
  let successfulLoanData = [];
  doCustomTimes(5, () => {
    successfulLoanData.push(Mock.mock({
      broNa: '@number',
      apNo: '@number',
      chaNa: '@name',
      coNo: '@number',
      proNa: '@name',
      funderNa: '@name',
      cuNa: '@string',
      cuNo: '@name',
      repayTy: '@date',
      payTy: '@number',
      payDay: '@number',
      loanAmount: '@date',
      residualPrincipal: '@string',
      interestDate: '@date',
      dueDate: '@date',
      accountSt: '@string'
    }));
  });
  return successfulLoanData;
};

export const getOverLoan = req => {
  let overDueLoan = [];
  doCustomTimes(5, () => {
    overDueLoan.push(Mock.mock({
      contractNu: '@number',
      borrowNu: '@number',
      channelNa: '@name',
      nameFunder: '@name',
      overdueDay: '@string',
      overduePer: '@string',
      overdueAm: '@number',
      overdueFree: '@number',
      lateCharge: '@number',
      overdueCom: '@number',
      firstOverdue: '@string'
    }));
  });
  return overDueLoan;
};

export const getClaimNotification = req => {
  let ClaimNotification = [];
  doCustomTimes(5, () => {
    ClaimNotification.push(Mock.mock({
      batchNu: '@number',
      channelNa: '@name',
      nameFunder: '@name',
      overdueDay: '@string',
      overdueAm: '@number',
      lateCharge: '@number',
      calculated: '@number',
      SettlementAm: '@string'
    }));
  });
  return ClaimNotification;
};

export const getClaimApplication = req => {
  let ClaimApplication = [];
  doCustomTimes(5, () => {
    ClaimApplication.push(Mock.mock({
      batchNu: '@number',
      channelNa: '@name',
      nameFunder: '@name',
      overdueDay: '@string',
      overdueAm: '@number',
      lateCharge: '@number',
      calculated: '@number',
      SettlementAm: '@string'
    }));
  });
  return ClaimApplication;
};

export const getClaimConfirmation = req => {
  let ClaimConfirmation = [];
  doCustomTimes(5, () => {
    ClaimConfirmation.push(Mock.mock({
      batchNu: '@number',
      channelNa: '@name',
      nameFunder: '@number',
      claimDate: '@number',
      overdueDay: '@number',
      claimableAm: '@string',
      actualClaimAm: '@number',
      claimId: '@string'
    }));
  });
  return ClaimConfirmation;
};

export const getCustomerTableData = req => {
  let CustomerTableData = [];
  doCustomTimes(5, () => {
    CustomerTableData.push(Mock.mock({
      cuNo: '@name',
      cuNa: '@number',
      channelNa: '@string',
      cuTy: '@name',
      cardTy: '@string',
      idCard: '@string',
      phone: '@number',
      job: '@name'
    }));
  });
  return CustomerTableData;
};

export const getResultClaimDeduction = req => {
  let ResultClaimDeduction = [];
  doCustomTimes(5, () => {
    ResultClaimDeduction.push(Mock.mock({
      batchNu: '@name',
      channelNa: '@name',
      nameFunder: '@number',
      claimDate: '@number',
      claimableAm: '@number',
      actualAm: '@number',
      capitalSide: '@number',
      premiumDt: '@date',
      premium: '@number',
      claimIden: '@number'
    }));
  });
  return ResultClaimDeduction;
};

export const getClaimBalanceDetails = req => {
  let ClaimBalanceDetails = [];
  doCustomTimes(5, () => {
    ClaimBalanceDetails.push(Mock.mock({
      productNa: '@name',
      channelNa: '@name',
      nameFunder: '@name',
      guaranteeCor: '@number',
      balanceTime: '@number',
      balanceTotal: '@number',
      additionaBalance: '@number',
      balanceDeduction: '@number'
    }));
  });
  return ClaimBalanceDetails;
};

export const getDailyBalanceDetails = req => {
  let DailyBalanceDetails = [];
  doCustomTimes(5, () => {
    DailyBalanceDetails.push(Mock.mock({
      channelNu: '@number',
      channelNa: '@name',
      productNa: '@name',
      loanDate: '@string',
      loansDay: '@string',
      paymentDay: '@number',
      totalLoan: '@number'
    }));
  });
  return DailyBalanceDetails;
};

export const getAssetStatistics = req => {
  let AssetStatistics = [];
  doCustomTimes(5, () => {
    AssetStatistics.push(Mock.mock({
      channelNu: '@number',
      channelNa: '@name',
      productNa: '@name',
      loanDate: '@string',
      loansDay: '@number',
      paymentDay: '@number',
      totalLoan: '@number',
      totalNewLoan: '@number',
      dailyProfit: '@number'
    }));
  });
  return AssetStatistics;
};

export const getFundingStatistics = req => {
  let FundingStatistics = [];
  doCustomTimes(5, () => {
    FundingStatistics.push(Mock.mock({
      channelNu: '@number',
      channelNa: '@name',
      productNa: '@name',
      loanDate: '@string',
      loansDay: '@number',
      paymentDay: '@number',
      totalLoan: '@number',
      totalNewLoan: '@number',
      dailyProfitzkbc: '@number',
      dividingBalance: '@number',
      dailyProfit: '@number'
    }));
  });
  return FundingStatistics;
};

export const getAssetSettings = req => {
  let assetSettings = [];
  doCustomTimes(5, () => {
    assetSettings.push(Mock.mock({
      channelNo: '@number',
      channelNa: '@name',
      productNa: '@name',
      distributionRatio: '@number',
      founder: '@name',
      createDate: '@number'
    }));
  });
  return assetSettings;
};

export const getFundingSetting = req => {
  let fundingSetting = [];
  doCustomTimes(5, () => {
    fundingSetting.push(Mock.mock({
      fundNum: '@number',
      fundNa: '@name',
      distributionRa: '@number',
      crPerson: '@name',
      crDate: '@string'
    }));
  });
  return fundingSetting;
};

export const getUserTableData = req => {
  let userTableData = [];
  doCustomTimes(5, () => {
    userTableData.push(Mock.mock({
      loginNa: '@name',
      usNa: '@name',
      paTyCd: '@number',
      paNo: '@string',
      moNo: '@string',
      mailNo: '@email',
      newBrNo: '@number',
      st: '@string'
    }));
  });
  return userTableData;
};

export const getRoleTableData = req => {
  let RoleTableData = [];
  doCustomTimes(5, () => {
    RoleTableData.push(Mock.mock({
      roNa: '@name',
      roNo: '@number',
      crTm: '@date',
      st: '@string',
      crPerson: '@string'
    }));
  });
  return RoleTableData;
};

// 按期数统计
export const getPeriodicStatistics = req => {
  let periodicStatistics = [];
  doCustomTimes(5, () => {
    periodicStatistics.push(Mock.mock({
      date: '@date',
      channelNo: '@number',
      channelName: '@name',
      productNa: '@name',
      numberPeriod: '@number',
      loanAmount: '@number',
      lendersNumber: '@number',
      repaymentPrincipal: '@number',
      totalRepayment: '@number',
      totalInterest: '@number'
    }));
  });
  return periodicStatistics;
};

// 按月度放款统计
export const getMonthlyLending = req => {
  let monthlyLending = [];
  doCustomTimes(5, () => {
    monthlyLending.push(Mock.mock({
      date: '@date',
      channelNu: '@number',
      channelNa: '@name',
      funderNa: '@name',
      monthLoan: '@number',
      monthBalance: '@number',
      accumulativeLending: '@number',
      loanBalance: '@number',
      averageBalance: '@number'
    }));
  });
  return monthlyLending;
};
