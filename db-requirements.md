### User
- not self referencing
- one-to-one relationship with Profile table (profileId ---> profile.id)


### Profile


### ONE - ONE RELATIONSHIP (SIMULTANEOUS CREATION)

```TS
// OWNER (Define the property)
    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile
```

### ONE - TO - MANY RELATIONSHIP (ONE CREATES MANY)

```TS
// CRAETOR (Define the creation)
    @OneToMany(() => Photo, (photo) => photo.user)
    photos: Photo[]

// CREATON (Define the owner)
    @ManyToOne(() => User, (user) => user.photos)
    user: User

```

### MANY - TO - MANY RELATIONSHIP (TAGS)

```TS
//TAGS (Define the tags)
    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[]

```