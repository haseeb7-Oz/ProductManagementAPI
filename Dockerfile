# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj files
COPY *.sln ./
COPY ProductManagementAPI/*.csproj ./ProductManagementAPI/
COPY ProductManagementAPI.Common/*.csproj ./ProductManagementAPI.Common/
COPY ProductManagementAPI.Data/*.csproj ./ProductManagementAPI.Data/
COPY ProductManagementAPI.Repository/*.csproj ./ProductManagementAPI.Repository/
COPY ProductManagementAPI.Service/*.csproj ./ProductManagementAPI.Service/

# Restore dependencies
RUN dotnet restore

# Copy the rest and build
COPY . .
WORKDIR /app/ProductManagementAPI
RUN dotnet publish -c Release -o out

# Use the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/ProductManagementAPI/out ./
ENTRYPOINT ["dotnet", "ProductManagementApi.dll"]
