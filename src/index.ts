import app from './app';
import { Signs } from './Utils/constants';

console.log('ENVIRONMENT:', process.env.API_ENV);

const PORT = process.env.PORT || 5051;

app.listen(PORT, () => {
	console.log(`${Signs.okay} Server running in port: ${PORT}`);
});
