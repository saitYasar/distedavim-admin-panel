

import { FC } from "react";
import { SelectInput, SelectInputProps, required } from "react-admin";
export enum eSubmerchantUserRoles {
  Manager = 2,
  Employee = 3,
  Representative = 1,
}
interface RoleEnumSelectProps extends SelectInputProps {
}

export const RoleEnumSelect: FC<RoleEnumSelectProps> = (props) => {
  const roleEnumSelect = [
    { id: 2, name: "Yönetici Firma Kullanıcı" },
    { id: 3, name: "Çalışan Firma Kullanıcı" },
  ];
  return (
    <SelectInput
      source="role"
      label="Rol Seçiniz"
      choices={roleEnumSelect}
      onChange={props.onChange}
      validate={required()}
      fullWidth
      {...props}
    />
  );
};
