export enum SchwinIc4BluetoothCharacteristics {
	// begin: corresponds to 0x1816 Cycling Speed and Cadence Service -----------------------------------
	cscMeasurement = 0x2a5b, // notify property
	// dunno what this "characteristc UUID" characteristic is for. TODO: look into this UUID
	// this property shows up in two of characteristics that I can pull from the service.
	// cscMeasurement and scControlPoint
	auxilaryCscMeasurement = 0x2902, // read property
	cscFeature = 0x2a5c, // read property
	sensorLocation = 0x2a5d, // read property
	scControlPoint = 0x2a55, // indicate, write properties
	// end: corresponds to 0x1816 Cycling Speed and Cadence Service  ------------------------------------
	// begin: corresponds to 0x1816 Device Information  -------------------------------------------------
	manufacturerNameString = 0x2a29,
	modelNumberString = 0x2a24,
	hardwareRevisionString = 0x2a27,
	firmwareRevisionString = 0x2a26,
	softwareRevisionString = 0x2a28,
	pnpId = 0x2a50,
	// end: corresponds to 0x1816 Device Information ----------------------------------------------------
}
