/**
 * @param entity - entity state in DB
 * @param updatedEntity - entity state from client
 * @param table - db table where updates required
 * @return - updated table
 * */

export default function updateSubordinatesAndSupervisors(entity, updatedEntity, table) {
  const entityId = entity.id;
  const currentTable = table;
  const entitySupervisor = entity.supervisor;
  const updatedSupervisor = updatedEntity.supervisor;
  const isSuperVisorChanged = entitySupervisor !== updatedSupervisor;
  const entitySubordinates = entity.subordinates;
  const updatedSubordinates = updatedEntity.subordinates;
  const isSubordinatesChaned = !(entitySubordinates.length === updatedSubordinates.length
    && updatedSubordinates.every((subordinate) => entitySubordinates.includes(subordinate))
  );
  const addedSubordinatesIds = updatedSubordinates
    .filter((value) => !entitySubordinates.includes(value));
  const removedSubordinatesIds = entitySubordinates
    .filter((value) => !updatedSubordinates.includes(value));

  /**
   * Logic of members update
   * Steps:
   * -- IF SUPERVISOR CHANGED
   * 1. Add subordinates to new supervisor - addMemberSupervisor()
   * 2. Remove member from subordinates of previous supervisor - removeMemberSubordinate()
   * -- IF SUBORDINATES CHANGED
   * 3. Clear all previous supervisors from added
   * subordinates - removeMembersSupervisorSubordinates()
   * 4. Updated for all added subordinates their supervisor - updateMembersSupervisor()
   * 5. Clear for all removed subordinates their supervisor - removeMembersSupervisor()
   * */
  function addMemberSupervisor(supervisorId, id) {
    const idx = currentTable.findIndex((member) => member.id === supervisorId);
    currentTable[idx].subordinates.push(id);
  }
  function removeMemberSubordinate(supervisorId, id) {
    const idx = currentTable.findIndex((member) => member.id === supervisorId);
    if (idx < 0) return;
    currentTable[idx].subordinates = currentTable[idx]
      .subordinates.filter((subordinate) => subordinate !== id);
  }
  function removeMembersSupervisorSubordinates(addedSubordinates = []) {
    addedSubordinates.forEach((addedSubordinate) => {
      const idx = currentTable.findIndex((member) => member.id === addedSubordinate);
      if (idx < 0) return;
      const prevSupervisorId = currentTable[idx].supervisor;
      const prevSupervisorIdx = currentTable.findIndex((member) => member.id === prevSupervisorId);
      if (prevSupervisorIdx < 0) return;
      currentTable[prevSupervisorIdx].subordinates = currentTable[prevSupervisorIdx].subordinates
        .filter((subordinate) => subordinate !== addedSubordinate);
    });
  }
  function updateMembersSupervisor(addedSubordinates = [], id) {
    addedSubordinates.forEach((subordinate) => {
      const idx = currentTable.findIndex((member) => member.id === subordinate);
      currentTable[idx].supervisor = id;
    });
  }
  function removeMembersSupervisor(removedSubordinates = []) {
    removedSubordinates.forEach((subordinate) => {
      const idx = currentTable.findIndex((member) => member.id === subordinate);
      currentTable[idx].supervisor = '';
    });
  }

  if (isSuperVisorChanged) {
    addMemberSupervisor(updatedSupervisor, entityId);
    removeMemberSubordinate(entitySupervisor, entityId);
  }

  if (isSubordinatesChaned) {
    removeMembersSupervisorSubordinates(addedSubordinatesIds);
    updateMembersSupervisor(addedSubordinatesIds, entityId);
    removeMembersSupervisor(removedSubordinatesIds);
  }
  return currentTable;
}
