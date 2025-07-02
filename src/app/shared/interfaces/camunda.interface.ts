export interface CamundaVariable {
    type:                string;
    value:               string;
    valueInfo:           ValueInfo;
    id:                  string;
    name:                string;
    processDefinitionId: string;
    processInstanceId:   string;
    executionId:         string;
    caseInstanceId:      null;
    caseExecutionId:     null;
    taskId:              null;
    batchId:             null;
    activityInstanceId:  string;
    errorMessage:        null;
    tenantId:            null;
}
export interface ValueInfo {
}