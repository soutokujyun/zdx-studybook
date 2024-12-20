import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      tags: []
    }
  },
  actions: {
    addTag(route) {
      if (this.tags.findIndex(item => item.path == route.path) !== -1) return
      this.tags.push(route)
    },
    removeTag(route) {
      this.tags.splice(this.tags.findIndex(item => item.path == route.path), 1)
    }
  }
})