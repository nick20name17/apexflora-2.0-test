import type { BaseQueryParams, Response } from "../api.types"



export interface ProfileData {
    title: string
    text: string
    'btn-text': string
    link: string
}

export interface Profile{
    id: number
    page: string
    component: string
    image: string
    description: string
    data: ProfileData
  }


  export type ProfilesResponse = Response<Profile>


  export type ProfilePayload = Omit<Profile, 'id' | 'image'>


export interface ProfilesQueryParams extends BaseQueryParams {
}