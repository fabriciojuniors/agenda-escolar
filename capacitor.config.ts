import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.agendaescolar',
  appName: 'Agenda',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
		PushNotifications: {
			presentationOptions: [
				"badge",
				"sound",
				"alert"
			]
		}
	}
};

export default config;
