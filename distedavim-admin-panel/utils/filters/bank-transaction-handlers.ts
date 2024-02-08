export const bankTransactionsFilterHandler = (filter: any) => {
	if (filter?.created_at_greater_than === null) {
		delete filter?.created_at_greater_than;
	} else {
		const gt_created_at_in_ms = new Date(
			filter?.created_at_greater_than
		).setUTCHours(0, 0, 0, 0);
		filter.created_at_greater_than = gt_created_at_in_ms;
	}
	if (filter?.created_at_less_than === null) {
		delete filter?.created_at_less_than;
	} else {
		const lt_created_at_in_ms = new Date(
			filter?.created_at_less_than
		).setUTCHours(23, 59, 59, 999);
		filter.created_at_less_than = lt_created_at_in_ms;
	}
	if (filter?.due_at_greater_than === null) {
		delete filter?.due_at_greater_than;
	} else {
		const gt_due_at_in_ms = new Date(
			filter?.due_at_greater_than
		).setUTCHours(0, 0, 0, 0);
		filter.due_at_greater_than = gt_due_at_in_ms;
	}
	if (filter?.due_at_less_than === null) {
		delete filter?.due_at_less_than;
	} else {
		const lt_due_at_in_ms = new Date(
			filter?.due_at_less_than
		).setUTCHours(23, 59, 59, 999);
		filter.due_at_less_than = lt_due_at_in_ms;
	}
	return filter;
};
