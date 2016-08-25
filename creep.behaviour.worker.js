var behaviour = new Creep.Behaviour('worker');
behaviour.nextAction = function(creep){
    let priority;
    // Last Action completed / No more energy
    if( creep.carry.energy == 0 ) { 
        if(creep.room.situation.invasion)
            priority = [
                //Creep.action.withdrawing, 
                Creep.action.harvesting, 
                Creep.action.idle];
        else if(creep.room.relativeEnergyAvailable < HIVE_ENERGY_URGENT) // empty hive
            priority = [
                Creep.action.picking,
                //Creep.action.withdrawing,
                Creep.action.harvesting, 
                Creep.action.idle];
        else  // common
            priority = [
                Creep.action.picking,
                Creep.action.harvesting,
                //Creep.action.withdrawing, 
                Creep.action.idle];       
        if( _.sum(creep.carry) > creep.carry.energy ) {
            priority = _.concat(Creep.action.storing, priority);
        }
    }    
    else {	  
        if( creep.room.situation.invasion ) 
            priority = [
                Creep.action.fueling, 
                Creep.action.feeding, 
                Creep.action.repairing, 
                Creep.action.building, 
                //Creep.action.storing, 
                Creep.action.upgrading, 
                Creep.action.idle];
        else 
            priority = [
                Creep.action.picking,
                Creep.action.feeding, 
                Creep.action.repairing, 
                Creep.action.building, 
                Creep.action.fueling, 
                //Creep.action.storing, 
                Creep.action.upgrading, 
                Creep.action.idle];
        if( creep.room.ticksToDowngrade < 2000 ) { // urgent upgrading 
            priority = _.concat(Creep.action.upgrading, priority);
        }
    }
    for(var iAction = 0; iAction < priority.length; iAction++) {
        var action = priority[iAction];
        if(action.isValidAction(creep) && 
            action.isAddableAction(creep) && 
            action.assign(creep)) {
                return;
        }
    }
};
module.exports = behaviour;