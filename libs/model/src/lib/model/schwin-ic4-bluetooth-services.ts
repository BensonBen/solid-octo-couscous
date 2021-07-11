export enum SchwinIc4BluetoothServices {
	// these two although they appear in the bluetooth exploration tool I don't get access to them.
	// genericAccess = 0x1800,
	// genericAttribute = 0x1801,
	deviceInformation = 0x180a,
	heartRate = 0x180d,
	cyclingSpeedAndCadence = 0x1816,
	fitnessMachine = 0x1826,
	// these two although they appear in the bluetooth exploration tool I don't get access to them.
	// genericAccessUUID = '00001800-0000-1000-8000-00805f9b34fb',
	// genericAttributeUUID = '00001801-0000-1000-8000-00805f9b34fb',
	deviceInformationUUID = '0000180a-0000-1000-8000-00805f9b34fb',
	heartRateUUID = '0000180d-0000-1000-8000-00805f9b34fb',
	cyclingSpeedAndCadenceUUID = '00001816-0000-1000-8000-00805f9b34fb',
	fitnessMachineUUID = '00001826-0000-1000-8000-00805f9b34fb',

	// 0: 00001816-0000-1000-8000-00805f9b34fb
	// 1: 00001826-0000-1000-8000-00805f9b34fb
	// 2: 0000180d-0000-1000-8000-00805f9b34fb
	// 3: 0000180a-0000-1000-8000-00805f9b34fb
}
