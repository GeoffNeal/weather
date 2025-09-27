import { Activities } from '../../../generated/gql';
import Activity from '../abstract/Activity';
import * as activities from '../activities';

class ActivityFactory {
  factory: Activity;

  constructor(activity: Activities) {
    this.factory = new activities[activity.toString()]();
  }

  init() {
    return this.factory;
  }
}

export default ActivityFactory;
