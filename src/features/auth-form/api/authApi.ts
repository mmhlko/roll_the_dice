import { AxiosResponse } from "axios";
import { api } from "src/shared/api";
import { TUserResponse, TLoginFormData } from "src/shared/types/authTypes";

class AuthService {
    login(formData: TLoginFormData): Promise<AxiosResponse<TUserResponse>> {
        return api.post("/client-login", formData);
    }
    checkMe(): Promise<AxiosResponse<any>> {
        return api.get("/auth/me")
    }
}

export const authApi = new AuthService();