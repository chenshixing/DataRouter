/**
 * Created by Ethan on 2016/12/6.
 * 报告模版
 */
import {PersonalRiskInfo} from "../template/personalRiskReport";
import {PersonalCredit} from "../template/personalCreditReport";
import {ConsumerBehaviors} from "../template/consumerBehaviorsReport";
import {PersonalStability} from "../template/personalStabilityReport";
//1.0.2
import {AirTravelGrade} from "../template/airTravelGradeReport";
import {BrMark} from "../template/brMarkReport";
import {BusinessAnalysis} from "../template/businessAnalysisReport";
import {BusinessCredit} from "../template/businessCreditReport";
import {SpecialList} from "../template/specialListReport";
import {PaymentEvaluation} from "../template/paymentEvaluationReport";

export const Report = {
    personalRiskInfo: PersonalRiskInfo,
    personalCredit: PersonalCredit,
    consumerBehaviors: ConsumerBehaviors,
    personalStability: PersonalStability,
    airTravelGrade: AirTravelGrade,
    brMark: BrMark,
    businessAnalysis: BusinessAnalysis,
    businessCredit: BusinessCredit,
    specialList: SpecialList,
    paymentEvaluation: PaymentEvaluation
}
