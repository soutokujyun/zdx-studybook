import { auditPackage } from '../index.js';

// auditPackage(
//   `/Users/yuanjin/Desktop/my-site`,
//   `/Users/yuanjin/Desktop/my-site.md`
// ).then(() => {
//   console.log('本地工程审计完成');
// });

auditPackage(
  `/Users/admin/zdx-studybook/electron/02-react/`,
  `/Users/admin/zdx-studybook/electron/02-react/lock.md`
).then(() => {
  console.log('远程工程审计完成');
});
