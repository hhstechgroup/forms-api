import {EventEmitter} from "events"
import Request from "superagent";
import {config} from "../config"

class InstancesStore extends EventEmitter {
  constructor() {
    super();
    this.instances = [];
    this.loadInstances()
  }

  getAll() {
    return this.instances;
  }

  loadInstances(name) {
    if (name) {
      const url = config.instances_url + name;
      Request.get(url).then((response) => {
        this.instances = response.body.items;
        this.emit("formInstancesReload");
      })
    }
  }
}

const instanceStore = new InstancesStore();

//export default instanceStore;
export const stores = {
  instanceStore: new InstancesStore()
};