<template>
	<div>
		<h3 class="handle-comp">List</h3>
		<div v-if="column.length">
			<vue-sortable v-model="column" :options="sortOptions">
			<div v-for="(item, index) in column" :key="index" class="box">
				<vue-input v-model="item.title" placeholder="Title" class="mb-5">
					<template slot="prepend"><span class="handle-sort"><i class="vue-icon-sort"></i></span></template>
				</vue-input>
				<vue-button type="danger" :plain="true" icon="vue-icon-close" @click="deleteList(index)">删除</vue-button>
			</div>
			</vue-sortable>
		</div>
		<vue-button type="primary" @click="add_items"><i class="vue-icon-plus vue-icon--right"></i></vue-button>
	</div>
</template>

<script>
export default {
	props: {
		column: Array
	},
	data() {
		return {
			sortOptions: { group: {name: 'listsortable', pull: 'clone'} , handle: '.handle-sort'}
		}
	},
	methods: {
		add_items() {
			this.column.push({ title: "" });
		},
		deleteList(index) {
			this.column.splice(index, 1);
		}
	},
};
</script>

<style scoped>
.box{
	padding: 10px 0;
}
</style>
