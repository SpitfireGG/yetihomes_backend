import { API_KEY, API_URL } from "@/utils/main";
import { setCookie, getCookie, removeCookie } from "@/utils/cookies";

function getAccessToken(): string | null {
  return getCookie("accessToken");
}

function setAccessToken(token: string) {
  setCookie("accessToken", token, 900);
}

function getRefreshToken(): string | null {
  return getCookie("refreshToken");
}

function setRefreshToken(token: string) {
  setCookie("refreshToken", token, 7 * 24 * 60 * 60);
}

function clearTokens() {
  removeCookie("accessToken");
  removeCookie("refreshToken");
}

async function tryRefreshToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({ refreshToken }),
    });

    const result = await res.json();
    if (!res.ok) return false;

    setAccessToken(result.data.accessToken);
    if (result.data.refreshToken) setRefreshToken(result.data.refreshToken);
    return true;
  } catch {
    return false;
  }
}

export class CRUD {
  public PATH: string;
  private APIURL: string;

  constructor(path: string) {
    this.PATH = path;
    this.APIURL = `${API_URL}/${path}`;
  }

  private async authFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    const token = getAccessToken();
    const headers: Record<string, string> = {
      "x-api-key": API_KEY,
      ...(init?.headers as Record<string, string> || {}),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    let res = await fetch(input, { ...init, headers });

    if (res.status === 401 && token) {
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        const newToken = getAccessToken();
        headers["Authorization"] = `Bearer ${newToken}`;
        res = await fetch(input, { ...init, headers });
      } else {
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      }
    }

    return res;
  }

  public getData = async () => {
    try {
      const res = await this.authFetch(`${this.APIURL}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      return data;
    } catch (error: any) {
      console.error("Failed to get data", error.message);
      throw error;
    }
  };

  public getById = async (id: string) => {
    try {
      const res = await this.authFetch(`${this.APIURL}/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      return data;
    } catch (error: any) {
      console.error("Failed to get data by id", error.message);
      throw error;
    }
  };

  public create = async (data: any) => {
    try {
      const formData = new FormData();

      const jsonData = { ...data };
      delete jsonData.image;
      formData.append("data", JSON.stringify(jsonData));

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const res = await this.authFetch(this.APIURL, {
        method: "POST",
        headers: {},
        body: formData,
      });

      let result;
      try {
        result = await res.json();
      } catch {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }

      if (!res.ok) {
        throw new Error(result?.message || "Create failed");
      }

      return result;
    } catch (error: any) {
      console.error("Failed to create:", error.message);
      throw error;
    }
  };

  public createWithOutImage = async (data: any) => {
    try {
      const res = await this.authFetch(`${this.APIURL}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data, null, 2),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(
          result.message || "Something went wrong creating Currency",
        );
      }
      return result;
    } catch (error: any) {
      console.error("Failed to create currency:", error.message);
      throw error;
    }
  };

  public update = async (data: any, id: string) => {
    try {
      const formData = new FormData();

      const jsonData = { ...data };
      delete jsonData.image;

      formData.append("data", JSON.stringify(jsonData));

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const res = await this.authFetch(`${this.APIURL}/${id}`, {
        method: "PATCH",
        headers: {},
        body: formData,
      });

      let result;
      try {
        result = await res.json();
      } catch {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }

      if (!res.ok) {
        throw new Error(result?.message || "Update failed");
      }

      return result;
    } catch (error: any) {
      console.error("Failed to update:", error.message);
      throw error;
    }
  };

  public updateWithOutImage = async (data: any, id: string) => {
    try {
      const res = await this.authFetch(`${this.APIURL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data, null, 2),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong updating");
      }
      return result;
    } catch (error: any) {
      console.error("Failed to update", error.message);
      throw error;
    }
  };

  public delete = async (id: string) => {
    try {
      const res = await this.authFetch(`${this.APIURL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await res.json();
      if (res.ok && result.success) {
        return result.message;
      } else {
        throw new Error(result.message || "Something went wrong when delete");
      }
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };

  public markAsSold = async (id: string) => {
    try {
      const res = await this.authFetch(`${this.APIURL}/${id}/mark-sold`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to mark as sold");
      }
      return result;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };

  public markAsRented = async (id: string) => {
    try {
      const res = await this.authFetch(`${this.APIURL}/${id}/mark-rented`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to mark as rented");
      }
      return result;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };

  public publish = async (id: string) => {
    try {
      const res = await this.authFetch(`${this.APIURL}/${id}/publish`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to publish");
      }
      return result;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };

  public unpublish = async (id: string) => {
    try {
      const res = await this.authFetch(`${this.APIURL}/${id}/draft`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to set draft");
      }
      return result;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };

  public getDataById = async (id: string) => {
    try {
      const res = await this.authFetch(`${this.APIURL}/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        cache: "no-cache" as any,
      });
      const result = await res.json();
      if (res.ok && result.success) {
        return result;
      } else {
        throw new Error(
          result.message || "Something went wrong get data by id",
        );
      }
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };

  public getDataBySlug = async (slug: string) => {
    try {
      const res = await this.authFetch(`${this.APIURL}/slug/${slug}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        cache: "no-cache" as any,
      });
      const result = await res.json();
      if (res.ok && result.success) {
        return result;
      } else {
        throw new Error(
          result.message || "Something went wrong get data by id",
        );
      }
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };
}
