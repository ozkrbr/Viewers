import { BaseCriteria } from './BaseCriteria';

export class TargetTypeCriteria extends BaseCriteria {

    constructor() {
        super();
    }

    check(data) {
        const items = data.targets;
        const measurements = [];
        let message;

        items.forEach(item => {
            const measurement = item.measurement;
            const toolType = measurement.toolType.toLowerCase();
            const timepoint = item.timepoint;
            const timepointType = timepoint.timepointType.toLowerCase();

            if ((timepointType === 'baseline') && (toolType !== 'bidirectional')) {
                measurements.push(measurement);
            }
        });

        if (measurements.length) {
            message = 'Target lesions must have measurements (cannot be assessed as CR, UN/NE, EX)';
        }

        return this.respond(message, measurements);
    }

}
