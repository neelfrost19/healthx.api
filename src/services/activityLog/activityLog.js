import {DateTime} from "luxon";
import ActivityLog from "../../models/activityLog/activityLog.js";


class ActivityLogService {

    static async createLog(data) {
        const {actionTaker, action, actionTakenOn='' } = data;
        const log = data;
        const logPayload = {
            actionTaker,
            action,
            actionTakenOn,
            log,
        };
        this.setLogMessage(logPayload);
        log.time = DateTime.now().toMillis();

        await ActivityLog.create(log, undefined);
        return data;
    }


    static setLogMessage(logPayload) {
        const {log, actionTaker, action, actionTakenOn} =
            logPayload;
        switch (action) {
            case 'LoggedIn':
                log.message = `${actionTaker} logged in to HealthX`;
                break;
            case 'LoggedOut':
                log.message = `${actionTaker} logged out from HealthX`;
              break;
            case 'StaffRead':
                log.message = `${actionTaker} viewed a staff list`;
                break;
            case 'StaffCreate':
                log.message = `${actionTaker} created a staff named ${actionTakenOn}`;
                break;
            case 'StaffDelete':
                log.message = `${actionTaker} deleted a staff named ${actionTakenOn}`;
                break;
            case 'StaffUpdate':
                log.message = `${actionTaker} updated a staff named ${actionTakenOn}`;
                break;
        }
    }
}

export default ActivityLogService;