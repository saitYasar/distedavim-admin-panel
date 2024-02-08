const SubmerchantTypeText = (record: any) => {
  const getSubmerchantType: any = {
    private_clinic: "Özel Klinik",
    private_oral_dental_health_polyclinic: "Özel Ağız Diş Sağlığı Polikliniği",
    private_oral_dental_health_center: "Özel Ağız Diş Sağlığı Merkezi",
    private_in_hospital_dental_clinic:
      "Özel Hastane Ağız Diş Sağlığı Polikliniği",
    private_dental_hospital: "Özel Diş Kliniği",
    university_hospital: "Üniversite Hastanesi",
    dental_warehouse: "Diş Deposu",
    others: "Diğer",
  };

  return <span>{getSubmerchantType[record.type]}</span>;
};

export default SubmerchantTypeText;
