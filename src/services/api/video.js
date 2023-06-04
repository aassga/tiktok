import * as apiService from '@/services/apiService'


const followingList = () => apiService.get('following_list')
const forYouList = () => apiService.get('for_you_list')


export { followingList,forYouList }

// demo